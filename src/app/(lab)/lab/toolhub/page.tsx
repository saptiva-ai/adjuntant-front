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
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import AiChatWindow from "@/components/AiChatWindow";
import Button from "@/components/Button";
import Dropzone from "@/components/Dropzone";
import Input from "@/components/Input";
import MailIconOutline from "@/svg/Mail_Icon/Mail_IconOutline";
import MailIconSolid from "@/svg/Mail_Icon/Mail_IconSolid";
import { Message } from "@/types/message";
import RobotIcon from "@/svg/RobotIcon/Robot_Icon";
import Slider from "@/components/Slider";
import Spinner from "@/components/Spinner";
import TextArea from "@/components/TextArea";

import Uppy from "@uppy/core";
import WandMagicIcon from "@/svg/Wand_Magic_Icon/Wand_Magic_Icon";
// @ts-ignore
// eslint-disable-next-line sort-imports
import UppySpanishLocale from "@uppy/locales/lib/es_ES.js";
import axios from 'axios';
import useAiResponse from "@/hooks/useAiResponse";
import { useSession } from "next-auth/react";
import { v4 as uuidv4 } from "uuid";

const maxFileSize = 1000000;

const extractTextFromPDF = async (arrayBuffer: ArrayBuffer): Promise<string> => {
  const base64Buffer = Buffer.from(arrayBuffer).toString('base64');
  const response = await axios.post('http://localhost:3000/api/extract-text', { fileBuffer: base64Buffer });
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
  const [fileBuffer, setFileBuffer] = useState(new ArrayBuffer(maxFileSize));
  const [pdfText, setPdfText] = useState<string>('');
  const [uppy] = useState(
    () =>
      new Uppy({
        locale: UppySpanishLocale,
      }),
  );
  const email = session?.user.email ?? "";

  useEffect(() => {
    uppy.setOptions({
      restrictions: {
        allowedFileTypes: [".pdf"],
        maxFileSize,
        maxNumberOfFiles: 1,
      },
    });
    uppy.on("file-added", (file) => {
      file.data.arrayBuffer().then((buffer) => {
        setFileBuffer(buffer);
      });
    });
  }, [uppy]);

  useEffect(() => {
    if (fileBuffer) {
      (async () => {
        try {
          const text = await extractTextFromPDF(fileBuffer);
          setPdfText(text);
        } catch (error) {
          // console.error("Error extracting text from PDF", error);
        }
      })();
    }
  }, [fileBuffer]);

  const dropdownItems = [
    {
      key: "Mistral 7B",
      label: "Mistral 7B",
    },
    {
      key: "LLaMa2 7B",
      label: "LLaMa2 7B",
    },
    {
      key: "LLaMa3 8B",
      label: "LLaMa3 8B",
    },
    {
      key: "Phi 3",
      label: "Phi 3",
    },
  ];

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

  const maxTextAreaChars = 256;
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
    <div className='grid h-screen lg:grid-cols-5 lg:gap-2 lg:p-2'>
      <div className='flex max-h-screen flex-col gap-3 p-1 lg:col-span-4'>
        <AiChatWindow
          cardClasses='flex flex-col p-3 min-h-60   gap-1 overflow-auto overscroll-contain bg-gray-700/80 scrollbar scroll-smooth scrollbar-track-gray-200 scrollbar-thumb-teal-400 hover:scrollbar-thumb-teal-500 active:scrollbar-thumb-teal-400 basis-11/12'
          msgClasses='pt-1.5 text-small font-light leading-none text-default-600'
          aiProfilePicUrl='/img/logoVA.webp'
          messages={messages}
          msgLimit={10}
          onMsgLimitExceeded={chatWindowOnMsgLmtExceeded}
          topCardHeaderChildren={() => (
            <CardHeader>
              <div className='flex gap-3'>
                <div className='flex-1 justify-items-center'>
                  <Avatar
                    isBordered
                    showFallback
                    radius='full'
                    size='sm'
                    src='/img/logoVA.webp'
                  />
                </div>
                <div className='flex-2 text-justify'>
                  <div className='leading-1.5 flex w-full  flex-col rounded-e-xl rounded-es-xl border-gray-200 bg-gray-100 p-4 dark:bg-gray-700'>
                    <p className='pt-1.5 text-small font-light leading-none text-default-600'>
                      ¿Cómo puedo ayudarte hoy?
                    </p>
                  </div>
                </div>
              </div>
            </CardHeader>
          )}
          msgLimitExceededChildren={() => (
            <CardHeader>
              <div className='flex gap-3 '>
                <div className='flex-1 justify-items-center'>
                  <Avatar
                    isBordered
                    showFallback
                    radius='full'
                    size='sm'
                    src='/img/logoVA.webp'
                  />
                </div>
                <div className='flex-2 text-justify'>
                  <div className='leading-1.5 flex w-full flex-col rounded-e-xl rounded-es-xl border-gray-200 bg-gray-100 p-4 dark:bg-gray-700'>
                    <p className='pt-1.5 text-small font-light leading-none text-red-500'>
                      Has llegado al limite de mensajes. Porfavor, refresca esta
                      página
                    </p>
                  </div>
                </div>
              </div>
            </CardHeader>
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

        <TextArea
          className='basis-3/12'
          value={textAreaValue}
          minRows={7}
          maxRows={8}
          onValueChange={setTextAreaValue}
          isInvalid={textAreaIsInvalid}
          label='Instrucciones'
          description='Ingresa instrucciones como contexto adicional'
          errorMessage={`Las instrucciones deben ser de menos de ${maxTextAreaChars} carácteres`}
        />

        <div>
          <Dropzone
            className='basis-3/12'
            uppy={uppy}
            theme='dark'
            showProgressDetails
            width='100%'
            height='100%'
          />
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
