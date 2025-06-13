import { commands, ExecuteState, ICommand, TextAreaTextApi } from "@uiw/react-md-editor";
import { SVG, icons } from "./icons";
import Image from "next/image";
import { postUploadImage } from "@/http/general/solutionHttp";
import { assetsURL } from "@/http";
import toast from "react-hot-toast";
import Toast from "@/components/toast";

const HighlightCommand: ICommand = {
  name: 'Highlight',
  keyCommand: 'Highlight',
  buttonProps: { 'aria-label': 'Insert Highlight' },
  icon: <Image
    src={SVG.hightlightsvg}
    alt='svg'
    width={18}
    height={18}
    priority
  />,
  execute: (state: ExecuteState, api: TextAreaTextApi) => {
    let modifyText = `# ${state.selectedText}\n`;
    if (!state.selectedText) {
      modifyText = `# `;
    }
    api.replaceSelection(modifyText);
  },
};
const ImagePickerCommand: ICommand = {
  name: 'Image',
  keyCommand: 'Image',
  buttonProps: { 'aria-label': 'Insert Image', style: { cursor: "pointer" } },
  icon: (
    <Image
      alt="Pick image"
      src={SVG.imagesvg}
      width={18}
      height={18}
      priority
      style={{ cursor: 'pointer' }}
    />
  ),
  execute: async (state: ExecuteState, api: TextAreaTextApi) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        try {
          const response = await postUploadImage(file);
          const markdownImage = `![alt text](${assetsURL}${response.path})`;
          api.replaceSelection(markdownImage);
          toast.custom(
            <Toast
              icon={icons.successIcon}
              success
              text="Image Uploaded Success !"
            />, {
            position: "bottom-right",
            duration: 3000
          })
        } catch (err: any) {
          toast.custom(
            <Toast
              icon={icons.errorIcon}
              success={false}
              text={err.message}
            />, {
            position: "bottom-right",
            duration: 3000
          })
        }
      }
    };

    input.click();
  },
};


const BoldTextCommand: ICommand = {
  name: "Bold",
  keyCommand: "Bold",
  buttonProps: { 'aria-label': 'Insert Bold' },
  icon: <Image
    src={SVG.boldsvg}
    alt='svg'
    width={18}
    height={18}
    priority
  />,
  execute: (state: ExecuteState, api: TextAreaTextApi) => {
    let modifyText = `**${state.selectedText}**`
    if (!state.selectedText) {
      modifyText = '**Enter**'
    }
    api.replaceSelection(modifyText);
  }
}

const ItalicTextCommand: ICommand = {
  name: "italic",
  keyCommand: "italic",
  buttonProps: { 'aria-label': 'Insert italic' },
  icon: <Image
    src={SVG.italicsvg}
    alt='svg'
    width={18}
    height={18}
    priority
  />,
  execute: (state: ExecuteState, api: TextAreaTextApi) => {
    let modifyText = `*${state.selectedText}*`
    if (!state.selectedText) {
      modifyText = '*italic*'
    }
    api.replaceSelection(modifyText);
  }
}



const insertTabsCommand: ICommand = {
  name: "insertTabs",
  keyCommand: "insertTabs",
  buttonProps: { "aria-label": "Insert Tabs" },
  icon: <Image
    src={SVG.mixedCodesvg}
    alt="mixed-code"
    width={18}
    height={18}
    priority
  />,
  execute: (state: ExecuteState, api: TextAreaTextApi) => {
    const insertText = `
\`\`\`js
console.log("Hello from JS!");
\`\`\`

\`\`\`python
print("Hello from Python!")
\`\`\`
`;

    api.replaceSelection(insertText);
    const newPos = state.selection.start + insertText.length;
    api.setSelectionRange({ start: newPos, end: newPos });
  },
};

const inlineCodeBlockCommand: ICommand = {
  name: "Inline Code",
  keyCommand: "Inline Code",
  buttonProps: { 'aria-label': 'Insert Inline Code' },
  icon: <Image
    src={SVG.codesvg}
    alt='svg'
    width={18}
    height={18}
    priority
  />,
  execute: (state: ExecuteState, api: TextAreaTextApi) => {
    let modifyText = `\`${state.selectedText}\``
    if (!state.selectedText) {
      modifyText = `\`code\``
    }
    api.replaceSelection(modifyText);
  }
}

const multiLineCodeBlockCommand: ICommand = {
  name: "Inline Code",
  keyCommand: "Inline Code",
  buttonProps: { 'aria-label': 'Insert Inline Code' },
  icon: <Image
    src={SVG.codeBlocksvg}
    alt='svg'
    width={18}
    height={18}
    priority
  />,
  execute: (state: ExecuteState, api: TextAreaTextApi) => {
    let modifyText = `\`\`\`\n${state.selectedText}\n\`\`\``
    if (!state.selectedText) {
      modifyText = `\`\`\`\ncode\n\`\`\``
    }
    api.replaceSelection(modifyText);
  }
}

const quotesCommand: ICommand = {
  name: "Quotes",
  keyCommand: "Quotes",
  buttonProps: { 'aria-label': 'Insert Quotes' },
  icon: <Image
    src={SVG.quotesvg}
    alt='svg'
    width={18}
    height={18}
    priority
  />,
  execute: (state: ExecuteState, api: TextAreaTextApi) => {
    let modifyText = state.selectedText.split("\n").map(item => `> ${item}`).join("\n");
    if (!state.selectedText) {
      modifyText = `> quotes`
    }
    api.replaceSelection(modifyText);
  }
}

const timeComplexityCommand: ICommand = {
  name: "timecomplexity",
  keyCommand: "timecomplexity",
  buttonProps: { 'aria-label': 'Insert timecomplexity' },
  icon: <Image
    src={SVG.complexitysvg}
    alt='svg'
    width={18}
    height={18}
    priority
  />,
  execute: (state: ExecuteState, api: TextAreaTextApi) => {
    api.replaceSelection("***O(n)***");
  }
}

const dividerCommand: ICommand = {
  name: "Divider",
  keyCommand: "Divider",
  buttonProps: { 'aria-label': 'Insert Divider' },
  icon: <Image
    src={SVG.dividersvg}
    alt='svg'
    width={18}
    height={18}
    priority
  />,
  execute: (state: ExecuteState, api: TextAreaTextApi) => {
    api.replaceSelection("---")
  }
}

const linkCommand: ICommand = {
  name: "Link",
  keyCommand: "Link",
  buttonProps: { 'aria-label': 'Insert Link' },
  icon: <Image
    src={SVG.linksvg}
    alt='svg'
    width={18}
    height={18}
    priority
  />,
  execute: (state: ExecuteState, api: TextAreaTextApi) => {
    api.replaceSelection("[title](url)")
  }
}

const orderedListCommand: ICommand = {
  name: "OrderedList",
  keyCommand: "OrderedList",
  buttonProps: { 'aria-label': 'Insert OrderedList' },
  icon: <Image
    src={SVG.orlderlistsvg}
    alt='svg'
    width={18}
    height={18}
    priority
  />,
  execute: (state: ExecuteState, api: TextAreaTextApi) => {
    let modifyText = state.selectedText.split("\n").map((text,index)=>`${index+1}. ${text}`).join("\n");
    if (!state.selectedText) {
      modifyText = `1. quotes`
    }
    api.replaceSelection(modifyText);
  }
}


const unOrderedListCommand: ICommand = {
  name: "OrderedList",
  keyCommand: "OrderedList",
  buttonProps: { 'aria-label': 'Insert OrderedList' },
  icon: <Image
    src={SVG.orlderlistsvg}
    alt='svg'
    width={18}
    height={18}
    priority
  />,
  execute: (state: ExecuteState, api: TextAreaTextApi) => {
    let modifyText = state.selectedText.split("\n").map((text,index)=>`- ${text}`).join("\n");
    if (!state.selectedText) {
      modifyText = `- quotes`
    }
    api.replaceSelection(modifyText);
  }
}


const commandsList = [
  HighlightCommand,
  BoldTextCommand,
  ItalicTextCommand,
  commands.divider,
  orderedListCommand,
  unOrderedListCommand,
  dividerCommand,
  commands.divider,
  inlineCodeBlockCommand,
  multiLineCodeBlockCommand,
  insertTabsCommand,
  commands.divider,
  timeComplexityCommand,
  linkCommand,
  commands.divider,
  ImagePickerCommand,
  quotesCommand,
  commands.help,
]

export default commandsList 
