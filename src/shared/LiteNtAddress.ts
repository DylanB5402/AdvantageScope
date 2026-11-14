// Copyright (c) 2021-2026 Littleton Robotics
// http://github.com/Mechanical-Advantage
//
// Use of this source code is governed by a BSD
// license that can be found in the LICENSE file
// at the root directory of this project.

import { DEFAULT_PREFS } from "./Preferences";

/**
 * Codespaces (and similar) expose each forwarded port as its own hostname:
 *   <name>-5808.app.github.dev  → Lite UI
 *   <name>-5810.app.github.dev  → NetworkTables
 * Rewrite the page host from the Lite port to the NT port when possible.
 */
export function rewriteForwardedPortHost(hostname: string, fromPort: number, toPort: number): string | null {
  let match = hostname.match(new RegExp(`^(.*)-${fromPort}(\\..+)$`));
  if (match === null) {
    return null;
  }
  return `${match[1]}-${toPort}${match[2]}`;
}

/**
 * Host AdvantageScope Lite should use for live NT.
 *
 * Priority:
 * 1. Codespaces-style rewrite of the page hostname (5808 → 5810)
 * 2. Explicit Robot Address when the user changed it from the default
 * 3. Page hostname (Systemcore / same-host Lite)
 * 4. Robot Address fallback
 */
export function resolveLiteNtAddress(robotAddress: string, pageHostname: string = window.location.hostname): string {
  let rewritten = rewriteForwardedPortHost(pageHostname, 5808, 5810);
  if (rewritten !== null) {
    return rewritten;
  }

  if (robotAddress !== "" && robotAddress !== DEFAULT_PREFS.robotAddress) {
    return robotAddress;
  }

  if (pageHostname !== "") {
    return pageHostname;
  }

  return robotAddress;
}
