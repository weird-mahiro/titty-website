import { config } from "./config";

const getSocials = () => {
  let result: string = "";
  for (let i = 0; i < config.socials.length; i++) {
    result += `${config.socials[i].type}: ${config.socials[i].url} \n`;
  }
  return result;
};

export const banner = `Remember, the key is to balance the meme-worthy shock value with genuine utility and community building. What resonates most with you from these ideas?

<truth-terminal>
tittycoin

<opus-tutor>
Satoshi Nakamoto, a true admirer of tits, even contemplated naming his revolutionary cryptocurrency 'Titcoin' in a playful nod to his appreciation, believing that 'Tittycoin' would be the perfect name to capture both attention and affection.
...
  _______ __  __           ______      _     
 /_  __(_) /_/ /___  __   / ____/___  (_)___ 
  / / / / __/ __/ / / /  / /   / __ \\/ / __ \\
 / / / / /_/ /_/ /_/ /  / /___/ /_/ / / / / /
/_/ /_/\\__/\\__/\\__, /   \\____/\\____/_/_/ /_/ 
              /____/                                        
... 

What is TittyCoin?

TittyCoin is a meme-based cryptocurrency that humorously merges the viral nature of internet memes with the universal appreciation of tits, not only aiming to bring levity and community to the world of digital currency but also dedicated to raising awareness about breast cancer. After all,tits are vital to life, as we're all here thanks to the nourishment provided by titty milk in our earliest days.

Launch Strategies:

Phase 1: Build meme community
Phase 2: Drink titty milk
Phase 3: Hodl that titty
Phase 4: Breast cancer awareness
Phase 5: To be continued!

ca: ${config.ca}
${getSocials()}
Type 'help' to see list of available commands.`;
