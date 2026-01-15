// src/app/components/AsciiConsole.js
"use client";

import { useEffect } from "react";

export default function Signature() {
  useEffect(() => {
    const ascii = String.raw`
    .___            ___.             __  .__
  __| _/_______  __ \_ |__ ___.__. _/  |_|  |__   ____   _____ _____    ______
 / __ |/ __ \  \/ /  | __ <   |  | \   __\  |  \ /  _ \ /     \\__  \  /  ___/
/ /_/ \  ___/\   /   | \_\ \___  |  |  | |   Y  (  <_> )  Y Y  \/ __ \_\___ \
\____ |\___  >\_/    |___  / ____|  |__| |___|  /\____/|__|_|  (____  /____  >
     \/    \/            \/\/                 \/             \/     \/
    `;
    console.log(ascii);
  }, []);

  return null; // rien à afficher dans le DOM
}
