---
title: "Connecting to Ubuntu from a Mac with Microsoft Windows App"
date: "2026-11-24"
description: "Set up GNOME Desktop Sharing on Ubuntu and control your desktop from a Mac using Microsoft Windows App."
tags: ["Ubuntu", "GNOME", "RDP", "macOS"]
---

GNOME’s built-in Desktop Sharing lets you view and control your Ubuntu desktop from a Mac using Microsoft Windows App. You’ll need Ubuntu Desktop with GNOME, Windows App installed on your Mac, and both computers on the same local network.

## Set up Desktop Sharing on Ubuntu

1. Sign in to Ubuntu and open **Settings → System → Remote Desktop → Desktop Sharing**.
2. Turn on **Desktop Sharing**, then turn on **Remote Control** so you can use your Mac’s keyboard and mouse in the Ubuntu session.
3. Under **Login Details**, use the pencil icons beside **Username** and **Password** to set the credentials you’ll enter in Windows App.
4. Note the port shown in Desktop Sharing. To find your Ubuntu machine’s IP address on Wi-Fi, open **Settings → Wi-Fi**, select the gear icon next to the connected network, and look for **IPv4 Address**.

Keep your Ubuntu session signed in. Desktop Sharing connects to that existing session.

## Connect from your Mac

1. Open **Windows App** and choose **Add PC**.
2. In **PC Name**, enter the Ubuntu IP address and the port from Desktop Sharing as `IP:port`. For example, using the documentation-only address `192.0.2.55` and the default RDP port `3389`, the entry would be `192.0.2.55:3389`.
3. Save the PC, then double-click its entry to connect.
4. When prompted, enter the username and password you set under **Login Details** on Ubuntu.

Once the Ubuntu desktop appears in Windows App, move the pointer or open an app to confirm that remote control works.

[Ubuntu Desktop Sharing documentation](https://documentation.ubuntu.com/desktop/en/24.04/how-to/share-your-desktop-remotely/)
