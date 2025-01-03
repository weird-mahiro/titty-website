import themes from "../../themes.json";
import { history } from "../stores/history";
import { theme } from "../stores/theme";
import { config } from "../../config";

const banner = `
████████╗██╗████████╗████████╗██╗   ██╗
╚══██╔══╝██║╚══██╔══╝╚══██╔══╝╚██╗ ██╔╝
   ██║   ██║   ██║      ██║    ╚████╔╝ 
   ██║   ██║   ██║      ██║     ╚██╔╝  
   ██║   ██║   ██║      ██║      ██║   
   ╚═╝   ╚═╝   ╚═╝      ╚═╝      ╚═╝   

ca: ${config.ca}
Type 'help' to see list of available commands.
${config.bannerRoadmap}`;

export const commands: Record<
  string,
  (args: string[]) => Promise<string> | string
> = {
  help: () => "Available commands: " + Object.keys(commands).join(", "),
  socials: () => {
    let result: string = "";
    for (let i = 0; i < config.socials.length; i++) {
      result += `${config.socials[i].type}: ${config.socials[i].url} \n`;
    }
    return result;
  },
  roadmap: () => config.roadmap,
  theme: (args: string[]) => {
    const usage = `Usage: theme [args].
    [args]:
      ls: list all available themes
      set: set theme to [theme]

    [Examples]:
      theme ls
      theme set ayudark
    `;
    if (args.length === 0) {
      return usage;
    }

    switch (args[0]) {
      case "ls": {
        let result = themes.map((t) => t.name.toLowerCase()).join(", ");
        return result;
      }

      case "set": {
        if (args.length !== 2) {
          return usage;
        }

        const selectedTheme = args[1];
        const t = themes.find((t) => t.name.toLowerCase() === selectedTheme);

        if (!t) {
          return `Theme '${selectedTheme}' not found. Try 'theme ls' to see all available themes.`;
        }

        theme.set(t);

        return `Theme set to ${selectedTheme}`;
      }

      default: {
        return usage;
      }
    }
  },
  banner: () => {
    return banner;
  },
  education: () => {
    return config.education;
  },
  prevention: () => {
    return config.prevention;
  },
  screening: () => {
    return config.screening;
  },
  clear: () => {
    history.set([
      {
        command: "banner",
        outputs: [banner],
      },
    ]);

    return "";
  },
};
