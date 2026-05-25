# ![AdvantageScope](/docs/docs/img/banner.png)

[![Build](https://github.com/Mechanical-Advantage/AdvantageScope/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/Mechanical-Advantage/AdvantageScope/actions/workflows/build.yml)

AdvantageScope is a robot diagnostics, log review/analysis, and data visualization application for FIRST teams developed by Team 6328. It reads logs in WPILOG, DS log, Hoot (CTRE), REVLOG (REV Robotics), Road Runner, CSV, and RLOG file formats, plus live robot data viewing using NT4, Phoenix, RLOG, or FTC Dashboard streaming. AdvantageScope can be used with any WPILib project, but is also optimized for use with our [AdvantageKit](https://docs.advantagekit.org) log replay framework. Note that **AdvantageKit is not required to use AdvantageScope**.

AdvantageScope includes the following tools:

- A wide selection of flexible graphs and charts
- 2D and 3D field visualizations of pose data, with customizable CAD-based robots
- Synchronized video playback from a separately loaded match video
- Joystick visualization, showing driver actions on customizable controller representations
- Swerve drive module vector displays
- Console message review
- Log statistics analysis
- Flexible export options, with support for CSV and WPILOG

**View the [online documentation](https://docs.advantagescope.org) or find it offline by clicking the 📖 icon in the tab bar.**

Feedback, feature requests, and bug reports are welcome on the [issues page](https://github.com/Mechanical-Advantage/AdvantageScope/issues). See the [contribution page](CONTRIBUTING.md) for more information on contributing to AdvantageScope. For non-public inquiries, please send a message to software@team6328.org.

![Example screenshot](/docs/docs/img/screenshot-light.png)

## Building AdvantageScope Lite (Static)

AdvantageScope Lite can be built as a purely static web app suitable for hosting on any static file server, Cloudflare Pages, GitHub Pages, etc. The static build includes live data visualization (NT4 WebSocket) but omits log file access and asset upload features that require a backend server.

```bash
npm run build:static
```

This runs `compile` with the Lite distribution and generates a static `assets.json`. Output goes to `lite/static/`.

To test locally:

```bash
cd lite/static && python3 -m http.server 5808
```

Open `http://localhost:5808` and use **Connect Live** (`Ctrl+K` / `Cmd+K`) to connect to your NT4-enabled robot or simulator. The WebSocket connection goes directly from the browser — no backend server needed.

### Deploying to hosting platforms

**Cloudflare Pages** — connect your repo, set:
- Build command: `npm run build:static`
- Output directory: `lite/static`

A `wrangler.jsonc` is included in the repo with the correct settings.

**GitHub Pages** — use a workflow that runs `npm run build:static` and deploys `lite/static/` via `actions/upload-pages-artifact`.

### Building with the server (original)

To build the original Lite version that includes log file access via the Python server:

```bash
ASCOPE_DISTRIBUTION=LITE npm run compile
```

Then serve with `python3 lite/lite_server.py --enable-file-access`.
