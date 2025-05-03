"use client";

import { config } from "@/components/providers";
import { useAddFrame, useMiniKit } from "@coinbase/onchainkit/minikit";
import type { FrameContext } from "@farcaster/frame-core/dist/context";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { Connector } from "wagmi";

interface MiniAppContextType {
  isFrameReady: boolean;
  setFrameReady: () => void;
  addFrame: () => Promise<{ url: string; token: string } | null>;
  context: FrameContext | undefined;
  connector: Connector;
}

const MiniAppContext = createContext<MiniAppContextType | undefined>(undefined);

export function MiniAppProvider({ children }: { children: ReactNode }) {
  const { isFrameReady, setFrameReady, context } = useMiniKit();
  const [frameContext, setFrameContext] = useState<FrameContext>();
  const [localConnector, setLocalConnector] = useState<Connector>(
    config.connectors[0]
  );
  const addFrame = useAddFrame();

  const handleAddFrame = useCallback(async () => {
    try {
      const result = await addFrame();
      if (result) {
        return result;
      }
      return null;
    } catch (error) {
      console.error("[error] adding frame", error);
      return null;
    }
  }, [addFrame]);

  useEffect(() => {
    // on load, set the frame as ready
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [isFrameReady, setFrameReady]);

  useEffect(() => {
    // on load, set the frame as ready
    if (context) {
      setFrameContext(context);
      setLocalConnector(config.connectors[0]);
    } else {
      setLocalConnector(config.connectors[1]);
    }
  }, [context, setFrameReady]);

  useEffect(() => {
    // when the frame is ready, if the frame is not added, prompt the user to add the frame
    if (isFrameReady && !context?.client?.added) {
      // handleAddFrame();
      console.log("ask to add frame");
    }
  }, [context?.client?.added, handleAddFrame, isFrameReady]);

  return (
    <MiniAppContext.Provider
      value={{
        isFrameReady,
        setFrameReady,
        addFrame: handleAddFrame,
        context: frameContext,
        connector: localConnector,
      }}
    >
      {children}
    </MiniAppContext.Provider>
  );
}

export function useMiniApp() {
  const context = useContext(MiniAppContext);
  if (context === undefined) {
    throw new Error("useMiniApp must be used within a MiniAppProvider");
  }
  return context;
}
