import themes from "../../themes.json";
import { history } from "../stores/history";
import { theme } from "../stores/theme";
import packageJson from "../../package.json";

const hostname = window.location.hostname;

const PICS_LEN = 15;

export const commands: Record<
  string,
  (args: string[]) => Promise<string> | string
> = {
  help: () => "Available commands: " + Object.keys(commands).join(", "),
  titty: () => {
    let rand_pics = Math.floor(Math.random() * PICS_LEN);
    window.open(`/photos/pics-${rand_pics}.jpg`, "_blank")?.focus();
    return "Some titties pics";
  },
  socials: () => {
    let result: string = "";
    for (let i = 0; i < packageJson.socials.length; i++) {
      result += `${packageJson.socials[i].type}: ${packageJson.socials[i].url} \n`;
    }
    return result;
  },
  roadmap: () =>
    "If this shit hits 5 million market cap, we have plans to donate to breast cancer or some charity involving $TITTY so lets pump this motherfucker.",
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
  banner: () => `
████████╗██╗████████╗████████╗██╗   ██╗
╚══██╔══╝██║╚══██╔══╝╚══██╔══╝╚██╗ ██╔╝
   ██║   ██║   ██║      ██║    ╚████╔╝ 
   ██║   ██║   ██║      ██║     ╚██╔╝  
   ██║   ██║   ██║      ██║      ██║   
   ╚═╝   ╚═╝   ╚═╝      ╚═╝      ╚═╝   

ca: ${packageJson.ca}
Type 'help' to see list of available commands.
`,
  clear: () => {
    history.set([]);

    return "";
  },
};
