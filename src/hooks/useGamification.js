"use client";

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export function useGamification() {
  const [isSyncing, setIsSyncing] = useState(false);
  const supabase = createClient();

  const processScenarioClear = async (scenarioId, xpReward) => {
    setIsSyncing(true);
    try {
      // 1. Fetch current user session
      const { data: authData, error: authError } = await supabase.auth.getUser();
      
      if (authError) {
        throw new Error(`Authentication error: ${authError.message}`);
      }
      if (!authData?.user) {
        throw new Error("No active user session found.");
      }

      const userId = authData.user.id;

      // 2. Fetch user's current data from public.users
      const { data: userData, error: fetchError } = await supabase
        .from('users')
        .select('xp_score, completed_modules')
        .eq('id', userId)
        .single();

      if (fetchError) {
        throw new Error(`Error fetching user data: ${fetchError.message}`);
      }
      
      const completedModules = userData?.completed_modules || [];
      
      // Prevent awarding XP if already completed
      if (completedModules.includes(scenarioId)) {
        console.log(`[GAMIFICATION] Scenario ${scenarioId} already completed. No XP awarded.`);
        return;
      }
      
      const currentXp = userData?.xp_score || 0;
      const newXp = currentXp + xpReward;
      const newCompletedModules = [...completedModules, scenarioId];

      // 3. Update the xp_score and completed_modules
      const { error: updateError } = await supabase
        .from('users')
        .update({ xp_score: newXp, completed_modules: newCompletedModules })
        .eq('id', userId);

      if (updateError) {
        throw new Error(`Error updating XP: ${updateError.message}`);
      }

      console.log(`[GAMIFICATION] Successfully awarded ${xpReward} XP for scenario ${scenarioId}. New total: ${newXp} XP`);
      window.dispatchEvent(new Event('gamification-update'));

    } catch (error) {
      // Robust try/catch error handling that logs errors clearly
      console.error("[GAMIFICATION_ERROR] Sync Failed:", error.message);
    } finally {
      // 4. Update local state to signify completion
      setIsSyncing(false);
    }
  };

  return { processScenarioClear, isSyncing };
}
