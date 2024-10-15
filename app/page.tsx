"use client";
import { LpAssetsInterface } from "@/components/lp-assets-interface"
import { Web3Provider } from "./Web3Provider"

export default function Page() {
  return (
  <Web3Provider>
    <LpAssetsInterface />
  </Web3Provider>
)
}