"use client";

import * as R from "ramda";
import {
  Avatar,
  Card,
  CardFooter,
  CardHeader,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import AiChatWindow from "@/components/AiChatWindow";
import Button from "@/components/Button";
import ChatBubble from "@/components/ChatBubble";
import FileUploader from "@/components/FileUploader";
import Input from "@/components/Input";
import MailIconOutline from "@/svg/Mail_Icon/Mail_IconOutline";
import MailIconSolid from "@/svg/Mail_Icon/Mail_IconSolid";
import { Message } from "@/types/message";
import RobotIcon from "@/svg/RobotIcon/Robot_Icon";
import Slider from "@/components/Slider";
import Spinner from "@/components/Spinner";
import TemplateCard from "@/components/TemplateCard";
import TextArea from "@/components/TextArea";
import WandMagicIcon from "@/svg/Wand_Magic_Icon/Wand_Magic_Icon";
// @ts-ignore
// eslint-disable-next-line sort-imports
import axios from "axios";
import { dropdownItems } from "@/data/dropdownItems";
import { templates } from "@/data/templates";
import useAiResponse from "@/hooks/useAiResponse";
import { useSession } from "next-auth/react";
import { v4 as uuidv4 } from "uuid";


const extractTextFromPDF = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer(); 
  const base64Buffer = Buffer.from(arrayBuffer).toString('base64');
  const response = await axios.post("http://localhost:3000/api/extract-text", {
     fileBuffer: base64Buffer
    });
  return response.data.text;
};

export default function Playground() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [query, setQuery] = useState("");
  const [inputIsDisabled, setInputIsDisabled] = useState(false);
  const [buttonIsDisabled, setButtonIsDisabled] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState("");
  const [sliderValue, setSliderValue] = useState(256);
  const [chatWindowMsgIsLoading, setChatWindowMsgIsLoading] = useState(false);
  const [pdfText, setPdfText] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  
  const email = session?.user.email ?? "";

  const handleFileAdded = useCallback((file: File) => {
    setFile(file);
  }, []);

  const handleTemplateSelect = (content: string) => {
    setTextAreaValue(content);
  };

  useEffect(() => {
    if (file) {
      (async () => {
        try {
          const text = await extractTextFromPDF(file);
          setPdfText(text);
        } catch (error) {
          // console.error("Error extracting text from PDF", error);
        }
      })();
    }
  }, [file]);

  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(
    new Set(["Mistral 7B"]),
  );
  const selectedValueRef = useRef<string>("Mistral 7B");

  useEffect(() => {
    if (selectedKeys.size > 0) {
      const firstSelectedKey = selectedKeys.values().next().value;
      selectedValueRef.current = firstSelectedKey || "Mistral 7B";
    }
  }, [selectedKeys]);

  const maxTextAreaChars = 1024;
  const textAreaIsInvalid = textAreaValue.length > maxTextAreaChars;

  useAiResponse({
    modelName: selectedValueRef.current,
    newTokens: sliderValue,
    onFetchError: () => {
      setChatWindowMsgIsLoading(false);
      setMessages(prevMsgs => [
        ...prevMsgs,
        {
          id: uuidv4(),
          role: "ai",
          text: "Hubo un error al procesar la respuesta",
        },
      ]);
    },
    onFetchedSuccess: (response: string) => {
      setChatWindowMsgIsLoading(false);
      setMessages(prevMsgs => [
        ...prevMsgs,
        {
          id: uuidv4(),
          role: "ai",
          text: response,
        },
      ]);
    },
    shouldFetch: chatWindowMsgIsLoading,
    sysPrompt: textAreaValue,
    text: pdfText,
    userEmail: email,
    userMessage: query,
  });

  const sendMsg = async (text: string) => {
    if (inputIsDisabled || buttonIsDisabled || textAreaIsInvalid) return;
    if (R.isEmpty(text)) return;

    const userMsg: Message = {
      id: uuidv4(),
      role: "human",
      text,
    };
    setQuery(text);

    setMessages(prevMsgs => [...prevMsgs, userMsg]);
    setChatWindowMsgIsLoading(true);
  };

  const inputHandleKeyDown = async (
    event: KeyboardEvent<HTMLInputElement> | KeyboardEvent,
  ) => {
    switch (event.key) {
      case "Enter":
        await sendMsg(query);
        setQuery("");
        break;

      default:
        break;
    }
  };

  const buttonOnClick = async () => {
    if (inputIsDisabled || buttonIsDisabled || textAreaIsInvalid) return;

    await sendMsg(query);
    setQuery("");
  };

  const chatWindowOnMsgLmtExceeded = () => {
    setInputIsDisabled(true);
    setButtonIsDisabled(true);
  };

  return (
    <div className='grid h-[92vh] lg:grid-cols-5 lg:gap-2 lg:p-2'>
      <div className=' flex max-h-[90vh] flex-col gap-3 p-1 lg:col-span-4'>
        <AiChatWindow
          cardClasses='flex flex-col p-3 min-h-60   gap-1 overflow-auto overscroll-contain bg-gray-700/80 scrollbar scroll-smooth scrollbar-track-gray-200 scrollbar-thumb-teal-400 hover:scrollbar-thumb-teal-500 active:scrollbar-thumb-teal-400 basis-11/12'
          msgClasses='pt-1.5 text-small font-light leading-none text-default-600'
          aiProfilePicUrl='/img/logoVA.webp'
          profilePicUrl={image}
          fullName={fullName}
          messages={messages}
          msgLimit={10}
          onMsgLimitExceeded={chatWindowOnMsgLmtExceeded}
          topCardHeaderChildren={() => (
            <ChatBubble
              user='AI'
              message='¿Cómo puedo ayudarte hoy?'
              dirChat='ltr'
              dirMessage='ltr'
              src='/img/logoVA.webp'
            ></ChatBubble>
          )}
          msgLimitExceededChildren={() => (
            <ChatBubble
              user='AI'
              message='Has llegado al limite de mensajes. Porfavor, refresca esta página'
              dirChat='ltr'
              dirMessage='ltr'
              src='/img/logoVA.webp'
            ></ChatBubble>
          )}
          isLoadingResponse={chatWindowMsgIsLoading}
          isLoadingContent={() => (
            <CardHeader>
              <div className='flex w-full  justify-center gap-3'>
                <div className='flex w-full '>
                  <Spinner color='success' size='lg' className='w-full' />
                </div>
              </div>
            </CardHeader>
          )}
        ></AiChatWindow>

        <Input
          className='basis-1/12'
          onValueChange={value => setQuery(value)}
          placeholder='Escribe tu pregunta'
          onKeyDown={inputHandleKeyDown}
          value={query}
          isDisabled={
            inputIsDisabled || textAreaIsInvalid || chatWindowMsgIsLoading
          }
          endContent={
            <Button
              className='text-saptivaGreen data-[disabled=true]:opacity-25 hover:cursor-pointer'
              isPressedClasses={{
                false: "h-6 w-6",
                true: "h-5 w-5",
              }}
              size='sm'
              variant='light'
              isIconOnly
              isHoveredChildren={() => <MailIconSolid />}
              onClick={buttonOnClick}
              isDisabled={buttonIsDisabled || chatWindowMsgIsLoading}
              isDisabledClass='opacity-80'
            >
              <MailIconOutline />
            </Button>
          }
        ></Input>
      </div>

      <div className='flex flex-col gap-3 lg:col-span-1 lg:p-1'>
        <Card className='flex  flex-col '>
          <CardHeader className='flex gap-3'>
            <p>Selecciona un modelo de IA:</p>
          </CardHeader>

          <Select
            className='max-w-xs p-3'
            label='Modelo de IA'
            defaultSelectedKeys={["cat"]}
            placeholder='Selecciona un modelo de IA'
            selectedKeys={selectedKeys}
            startContent={<RobotIcon />}
            onSelectionChange={setSelectedKeys as () => void}
          >
            {dropdownItems.map(item => (
              <SelectItem key={item.key}>{item.label}</SelectItem>
            ))}
          </Select>
        </Card>

        <Card className='flex  flex-col justify-center lg:p-2'>
          <CardHeader className='flex flex-col'>
            <Slider
              label='Tokens'
              step={1}
              minValue={100}
              maxValue={1024}
              value={sliderValue}
              onChange={setSliderValue as () => void}
              className='pt-2'
              classNames={{
                base: "max-w-md gap-3",
                filler: "bg-gradient-to-r from-teal-100 to-teal-500",
                track: "border-s-teal-100",
              }}
              renderThumb={props => (
                <div
                  {...props}
                  className='dark:border-default-00/50 group top-1/2 cursor-grab rounded-full border-small border-default-100 bg-background p-1 shadow-medium data-[dragging=true]:cursor-grabbing'
                >
                  <span className='block h-5 w-5 rounded-full bg-gradient-to-br from-teal-100 to-teal-500 shadow-small transition-transform group-data-[dragging=true]:scale-80' />
                </div>
              )}
            />
          </CardHeader>
          <CardFooter>
            <div className='flex gap-1'>
              <p className=' text-white-400 text-small'>
                Fragmentos de palabras a generar
              </p>
            </div>
          </CardFooter>
        </Card>

        <div className="flex flex-col gap-1">
          {templates.map((template) => (
              <TemplateCard key={template.id} template={template} onSelect={handleTemplateSelect} />
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <TextArea
            className='basis-3/12'
            value={textAreaValue}
            minRows={3}
            maxRows={4}
            onValueChange={setTextAreaValue}
            isInvalid={textAreaIsInvalid}
            label='Instrucciones'
            description='Ingresa instrucciones como contexto adicional'
            errorMessage={`Las instrucciones deben ser de menos de ${maxTextAreaChars} carácteres`}
          />
        </div>

        <div className="flex flex-col gap-2">
          <FileUploader onFileAdded={handleFileAdded} className="basis-3/12" />
          <div className="flex-1 overflow-y-auto p-4"></div>
        </div>

        <div className='flex flex-col'>
          <button
            type='button'
            className='inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-green-400 to-blue-600 px-5 py-2.5  text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-green-200 dark:focus:ring-green-800'
          >
            <WandMagicIcon />

            <span className='ml-2'>Generar Imagen</span>
          </button>
        </div>
      </div>
    </div>
  );
}
