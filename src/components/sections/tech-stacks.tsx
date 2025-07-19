'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BrainCircuit, Cloud, Code, Database, GitBranch, Layers, Cpu, Lightbulb, Server, SlidersHorizontal, AreaChart } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


type TechItem = {
  name: string
  Icon: LucideIcon | React.FC<React.SVGProps<SVGSVGElement>>
}

type TechStack = {
  category: string
  technologies: TechItem[]
  Icon: LucideIcon
}

// SVG Icon Components
const PythonIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 22.5C11.17 22.5 10.5 21.83 10.5 21V15H9C8.17 15 7.5 14.33 7.5 13.5V10.5H4.5C3.67 10.5 3 9.83 3 9V4.5C3 3.67 3.67 3 4.5 3H9C9.83 3 10.5 3.67 10.5 4.5V7.5H13.5C14.33 7.5 15 8.17 15 9V15H16.5C17.33 15 18 15.67 18 16.5V21C18 21.83 17.33 22.5 16.5 22.5H12Z" fill="#306998"/>
    <path d="M12 1.5C12.83 1.5 13.5 2.17 13.5 3V9H15C15.83 9 16.5 9.67 16.5 10.5V13.5H19.5C20.33 13.5 21 14.17 21 15V19.5C21 20.33 20.33 21 19.5 21H15C14.17 21 13.5 20.33 13.5 19.5V16.5H10.5C9.67 16.5 9 15.83 9 15V9H7.5C6.67 9 6 8.33 6 7.5V3C6 2.17 6.67 1.5 7.5 1.5H12Z" fill="#FFD43B"/>
  </svg>
);
const JavaIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path fillRule="evenodd" clipRule="evenodd" d="M18.17 15.76C17.2 16.52 16.03 17 14.82 17C13.29 17 12.02 16.34 11.13 15.26L12.91 12.89C13.23 13.41 13.82 13.88 14.63 13.88C15.29 13.88 15.77 13.62 16.03 13.29C16.3 12.95 16.3 12.55 16.14 12.08L15.11 9.48H18.5V7H12.63L10.79 12.2C9.88 10.74 8.52 10.19 7.22 10.19C5.92 10.19 4.8 10.68 4 11.66V7H1.5V18C1.5 20.25 3.28 22 5.59 22H7.21C8.42 22 9.45 21.52 10.19 20.59C10.63 21.43 11.45 22 12.58 22C14.34 22 15.42 21.03 15.81 19.53L17.72 19.5C17.5 20.9 16.17 22 14.48 22C12.78 22 11.23 21.01 11.05 19.53L9.13 19.53C9.33 20.98 10.76 22 12.44 22C14.14 22 15.54 21.06 15.81 19.53L16.2 17.95C17.23 17.51 18 16.73 18 15.76H18.17V15.76ZM7.31 13.06C6.58 13.06 6.03 13.58 6.03 14.28C6.03 15 6.58 15.51 7.31 15.51C8.04 15.51 8.59 15 8.59 14.28C8.59 13.58 8.04 13.06 7.31 13.06Z" fill="#F44336"/>
        <path d="M18 7H20.5V18C20.5 20.22 18.71 22 16.5 22H15.8C16.7 21.1 17.38 19.88 17.64 18.53L19.45 18.53C19.23 19.92 17.97 21 16.38 21C14.78 21 13.38 20.03 13.1 18.53L11.18 18.53C11.4 19.97 12.78 21 14.53 21C16.32 21 17.75 19.97 18 18.2V15.76C18.89 15.19 19.5 14.21 19.5 13.11C19.5 11.13 18.33 9.48 16.5 9.48H13.88L14.91 12.08C15.07 12.55 15.07 12.95 14.81 13.29C14.55 13.62 14.07 13.88 13.41 13.88C12.6 13.88 12.01 13.41 11.69 12.89L9.85 17.65C10.76 18.73 12.03 19.39 13.56 19.39C15.09 19.39 16.36 18.73 17.25 17.65L18 15.76V7Z" fill="#5A95E5"/>
    </svg>
);
const RIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} viewBox="0 0 24 24"><path fill="#276DC3" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2M11 17h-2V7h2v5h2v2h-2zm4.24-4.56l.76 5.56H14l-.38-2.7h-1.7l-.38 2.7h-1.9l2.76-8H15zM14.2 14h-1.3L12.5 9h.1z" /></svg>;
const JsIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="24" height="24" fill="#F7DF1E"/>
        <path d="M7.12 21.926h3.04l1.32-2.362-1.28-2.18-1.04.6v-.02h.02c.04.02.08.04.1.06.3.18.52.28.68.28.16 0 .3-.04.42-.12l.56-.36-1.3-2.22.46-.26h.02c.22-.12.42-.22.62-.3.2-.1.4-.14.6-.14.44 0 .8.14 1.08.42l.58.6-1.54 2.64 2.2 1.24h3.12l-3.32-5.76 3.4-5.68h-3.14l-1.84 3.28-1.42-2.42-.64 1.12 1.34 2.3-1.6 2.76-3.12-1.8-1.52 2.62-2.14-1.24-.96-1.66h3.02l.52.88.88-1.52-.52-.9h-2.1c-.26 0-.5.06-.72.18-.22.12-.4.3-.54.54l-1.4 2.42.92.54-.92.54z" fill="#000"/>
    </svg>
);
const CppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12 1.5A10.5 10.5 0 001.5 12A10.5 10.5 0 0012 22.5A10.5 10.5 0 0022.5 12A10.5 10.5 0 0012 1.5z" fill="#00599C"/>
        <path d="M12 3.375A8.625 8.625 0 003.375 12A8.625 8.625 0 0012 20.625A8.625 8.625 0 0020.625 12A8.625 8.625 0 0012 3.375z" fill="#0088D1"/>
        <path fill="#fff" d="M12.938 12.938h2.812v-1.876h-2.813V8.25h-1.875v2.812H8.25v1.875h2.813v2.813h1.875zM17.813 12.938h2.812v-1.876h-2.813V8.25h-1.875v2.812H13.12v1.875h2.813v2.813h1.875z"/>
    </svg>
);
const CIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M10.02 4.08C5.98 4.51 3 7.89 3 12C3 16.97 7.03 21 12 21C16.97 21 21 16.97 21 12C21 7.89 18.02 4.51 13.98 4.08C13.34 4.03 12.67 4 12 4C11.33 4 10.66 4.03 10.02 4.08Z" fill="#A8B9CC"/>
    <path d="M14.15 7.42C15.42 8.44 16.25 10.12 16.25 12C16.25 13.88 15.42 15.56 14.15 16.58L12.99 15.3C13.88 14.59 14.5 13.38 14.5 12C14.5 10.62 13.88 9.41 12.99 8.7L14.15 7.42Z" fill="#5C6BC0"/>
  </svg>
);
const ShellIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M4 3H20C21.1 3 22 3.9 22 5V19C22 20.1 21.1 21 20 21H4C2.9 21 2 20.1 2 19V5C2 3.9 2.9 3 4 3ZM5.5 8L9.5 12L5.5 16V14H7.5V10H5.5V8ZM10.5 16H18.5V14H10.5V16Z" fill="#4EAE5A"/>
  </svg>
);
const TensorFlowIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} viewBox="0 0 24 24"><path fill="#FF6F00" d="m4.23 14.58l4.08-2.36l-4.08-2.36V4.4l9.72 5.62v2.1l-6.52 3.75z"/><path fill="#FF8F00" d="m8.31 9.86l3.69-2.13l4.13 2.38l-4.13 2.38z"/><path fill="#FFA000" d="m4.23 15.42l6.52 3.75v-2.1l-4.02-2.32zM13.95 9.2v5.6l4.13 2.38V6.82z"/></svg>;
const PyTorchIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} viewBox="0 0 24 24"><path d="M14.5 3.3L13 3c-1 .2-1.9.9-2.6 1.7c-2.9 3.3-1.2 9.2 3.4 9.9c.7.1 1.3.1 1.7-.4c.5-.5.5-1.2.4-1.8c-.8-3.3-2.6-6-3.4-9.1z" fill="#EE4C2C"/><path d="M9.5 3.3L11 3c1-.2 1.9.9 2.6 1.7c2.9 3.3 1.2 9.2-3.4 9.9c-.7.1-1.3.1-1.7-.4c-.5-.5-.5-1.2-.4-1.8c.8-3.3 2.6-6 3.4-9.1z" fill="#EE4C2C"/><ellipse cx="12" cy="18.5" rx="3" ry="2.5" fill="#EE4C2C"/></svg>;
const HuggingFaceIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M20.88 14.12C19.65 16.24 17.05 17.5 14 17.5C10.95 17.5 8.35 16.24 7.12 14.12C7.03 13.97 7 13.78 7 13.53C7 13.27 7.04 13.07 7.12 12.94C7.2 12.81 7.32 12.74 7.47 12.74H20.53C20.68 12.74 20.8 12.81 20.88 12.94C20.96 13.07 21 13.27 21 13.53C21 13.78 20.97 13.97 20.88 14.12Z" fill="#FFD21E"/>
        <path d="M7.12 9.33C6.9 9.2 6.65 9.13 6.36 9.13C6.07 9.13 5.82 9.2 5.6 9.33C5.38 9.46 5.23 9.64 5.15 9.87C5.07 10.1 5.03 10.33 5.03 10.56C5.03 10.79 5.07 11.02 5.15 11.25C5.23 11.48 5.38 11.66 5.6 11.79C5.82 11.92 6.07 11.99 6.36 11.99C6.65 11.99 6.9 11.92 7.12 11.79C7.34 11.66 7.49 11.48 7.57 11.25C7.65 11.02 7.69 10.79 7.69 10.56C7.69 10.33 7.65 10.1 7.57 9.87C7.49 9.64 7.34 9.46 7.12 9.33Z" fill="#FFD21E"/>
        <path d="M18.4 9.33C18.18 9.2 17.93 9.13 17.64 9.13C17.35 9.13 17.1 9.2 16.88 9.33C16.66 9.46 16.51 9.64 16.43 9.87C16.35 10.1 16.31 10.33 16.31 10.56C16.31 10.79 16.35 11.02 16.43 11.25C16.51 11.48 16.66 11.66 16.88 11.79C17.1 11.92 17.35 11.99 17.64 11.99C17.93 11.99 18.18 11.92 18.4 11.79C18.62 11.66 18.77 11.48 18.85 11.25C18.93 11.02 18.97 10.79 18.97 10.56C18.97 10.33 18.93 10.1 18.85 9.87C18.77 9.64 18.62 9.46 18.4 9.33Z" fill="#FFD21E"/>
        <path d="M13.2 5.67C13.41 5.31 13.51 4.92 13.51 4.51C13.51 3.99 13.33 3.54 12.98 3.15C12.63 2.76 12.18 2.57 11.63 2.57C11.08 2.57 10.63 2.76 10.28 3.15C9.93 3.54 9.75 3.99 9.75 4.51C9.75 4.92 9.85 5.31 10.06 5.67L13.2 5.67Z" fill="#FFD21E"/>
    </svg>
);
const LangChainIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M9.41 14.59L12 16.17L14.59 14.59V11.41L12 9.83L9.41 11.41V14.59Z" fill="#7C3AED"/>
        <path d="M21.41 11.41L18.83 9.83L16.24 11.41V14.59L18.83 16.17L21.41 14.59V11.41Z" fill="#A78BFA"/>
        <path d="M14.59 7.83L12 6.25L9.41 7.83L6.83 6.25L9.41 4.67L12 6.25L14.59 4.67L17.17 6.25L14.59 7.83Z" fill="#8B5CF6"/>
        <path d="M9.41 7.83L6.83 6.25L4.24 7.83V11.41L6.83 12.99L9.41 11.41V7.83Z" fill="#A78BFA"/>
        <path d="M14.59 18.17L12 19.75L9.41 18.17L6.83 19.75L9.41 21.33L12 19.75L14.59 21.33L17.17 19.75L14.59 18.17Z" fill="#6D28D9"/>
        <path d="M9.41 18.17L6.83 19.75L4.24 18.17V14.59L6.83 16.17L9.41 14.59V18.17Z" fill="#A78BFA"/>
    </svg>
);
const DockerIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M22.01 9.42C21.49 7.43 19.92 5.73 18.03 5.02C15.73 4.15 13.13 4.52 11.01 6L11 6.01L11 6C12.1 5.36 13.3 5.1 14.52 5.23C15.82 5.37 17.02 6.26 17.46 7.52L17.57 7.85H15.46C15.16 7.23 14.65 6.78 14 6.56C13.35 6.34 12.65 6.37 12.02 6.65C11.39 6.93 10.87 7.43 10.57 8.05H8.99C8.69 7.43 8.18 6.98 7.53 6.76C6.88 6.54 6.18 6.57 5.55 6.85C4.92 7.13 4.4 7.63 4.1 8.25H2.51C2.21 7.63 1.7 7.18 1.05 6.96C0.4 6.74 -0.3 6.77 0.97 7.85H0.5C0.22 7.85 0 8.07 0 8.35V13.5H4V12.5H2V10.5H4V8.5H5.5C5.5 8.78 5.72 9 6 9H10C10.28 9 10.5 8.78 10.5 8.5H12C12 8.78 12.22 9 12.5 9H16.5C16.78 9 17 8.78 17 8.5H18.5V10.5H16.5V12.5H20.5V8.35C20.5 8.07 20.28 7.85 20 7.85H18.57L18.57 7.85C18.66 7.45 18.67 7.03 18.58 6.63C18.33 5.52 17.54 4.58 16.48 4.11C15.42 3.64 14.22 3.71 13.18 4.29L12.01 3.2C13.71 2.13 15.81 1.87 17.81 2.57C20.21 3.44 22.01 5.67 22.01 9.42V9.42ZM4.5 16.5H0.5V15.5H4.5V16.5ZM9.5 16.5H5.5V15.5H9.5V16.5ZM14.5 16.5H10.5V15.5H14.5V16.5ZM19.5 16.5H15.5V15.5H19.5V16.5Z" fill="#2496ED"/>
    </svg>
);
const AwsIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12.94 13.43C12.49 13.76 11.99 13.96 11.48 14.04C10.51 14.2 9.58 13.76 9.07 13.01C8.56 12.26 8.52 11.3 8.96 10.48C9.4 9.66 10.23 9.16 11.16 9.16C11.65 9.16 12.13 9.32 12.53 9.59L13.07 8.97C12.55 8.62 11.95 8.42 11.32 8.42C9.37 8.42 7.72 9.82 7.39 11.74C7.09 13.51 8.26 15.23 10.04 15.56C12.04 15.92 13.92 14.52 14.32 12.58L13.72 12.69L12.94 13.43Z" fill="#FF9900"/>
        <path d="M17.43 8.25C17.29 7.25 16.04 6.05 14.33 6.05C12.99 6.05 11.83 6.78 11.3 7.55L11.94 7.96C12.3 7.35 13.16 6.75 14.33 6.75C15.56 6.75 16.39 7.55 16.52 8.25H17.43Z" fill="#232F3E"/>
        <path d="M22 13.54C20.66 15.69 18.2 17 15.39 17C11.75 17 8.85 14.6 8.3 11.37L7.26 11.55C7.5 11.71 8.59 12.59 8.59 14C8.59 14.5 8.42 14.94 8.11 15.3C7.57 16.03 6.7 16.48 5.68 16.48L5 16.27L4.32 16.79C4.92 17.46 5.74 17.85 6.63 17.85C7.73 17.85 8.73 17.22 9.25 16.27C9.47 16.29 9.68 16.31 9.9 16.31C13.38 16.31 16.35 14.44 17.8 11.8L22 13.54Z" fill="#232F3E"/>
    </svg>
);
const AzureIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} viewBox="0 0 24 24"><path d="m13.29 4.22l-4.15 7.18l-5.35-.35a.51.51 0 0 0-.49.66l7.85 11.96a.5.5 0 0 0 .88-.01l7.68-15.04a.5.5 0 0 0-.45-.75l-6-1.65Z" fill="#0078D4"/></svg>;
const PostgreSqlIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} viewBox="0 0 24 24"><path fill="#336791" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2m4.14 14.19h-5.4v-5.5h2.19v3.31h3.21zm0-7.79H8.62V8.6h7.52Z" /></svg>;
const MySqlIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12.14 14.61C10.34 14.7 8.82 13.56 8.31 11.96H16C15.5 13.56 13.95 14.7 12.14 14.61Z" fill="#00758F"/>
        <path d="M13 3.07C11.4 3.31 9.91 3.97 8.68 4.96L10.11 6.39C11 5.76 12 5.5 13 5.5C16.28 5.5 18.25 8.03 18.25 11.06H16.75C16.75 8.77 15.33 6.99 13 6.99C12.16 6.99 11.37 7.28 10.72 7.77L8.9 6.01C8.37 5.45 7.77 4.97 7.12 4.58C5.1 3 3 5.1 3 7.11C3 7.82 3.18 8.49 3.5 9.11H11.25C11.44 8.42 11.7 7.76 12.1 7.15C13.1 5.43 14.3 5.2 15.3 5.2C16.58 5.2 17.55 6.08 17.55 7.45C17.55 8.09 17.32 8.7 16.92 9.2C16.6 9.61 16.2 9.95 15.73 10.14V13.2C16.58 13.45 17.35 13.99 17.92 14.74C18.63 15.67 19.11 16.86 19.11 18.2C19.11 20.2 17.82 22.2 14.61 22.2C13.3 22.2 12.08 21.79 11.11 21.1L12.59 19.62C13.32 20.05 14.13 20.33 15.01 20.33C17.15 20.33 18.11 19.18 18.11 17.83C18.11 16.98 17.73 16.19 16.96 15.62C16.16 15.03 15.08 14.71 13.92 14.71C11.62 14.71 9.42 15.95 9.42 18.71H7.92C7.92 15.5 10.31 13.46 13.17 13.46C14.06 13.46 14.9 13.69 15.67 14.12V13C15.61 12.98 15.55 12.95 15.48 12.93L15.42 12.91C14.12 12.41 13.42 11.41 13.42 10.25C13.42 8.34 14.72 7.19 16.25 7.19C17.15 7.19 17.96 7.64 18.52 8.48L19.45 6.94C18.8 6.04 17.8 5.5 16.73 5.5C14.43 5.5 12.83 7.42 12.83 9.53V13C12.87 13 12.91 13 12.96 13C13.01 13 13.06 13 13.1 13L13.13 13.01C13.08 11.53 13.61 10.15 14.61 9.25C15.01 8.84 15.51 8.54 16.05 8.35L16.08 8.34C16.48 8.18 16.85 7.95 17.15 7.65C17.38 7.42 17.55 7.11 17.55 6.75C17.55 6.22 17.1 5.8 16.53 5.8C15.53 5.8 14.83 6.55 14.33 7.35L13.55 8.78L13 7.82L13.18 4.29L12.01 3.2C10.63 2.13 8.53 1.87 6.53 2.57C4.13 3.44 2.33 5.67 2.33 9.42H2.33V9.42L3.5 9.11L3.5 9.11Z" fill="#F29111"/>
    </svg>
);
const MongoDbIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.12 15.44c-2.4 0-4.48-1.57-4.48-4.14 0-.85.52-1.84 1.17-2.6 1.09-1.25 2.76-1.87 4.5-1.87s3.41.62 4.5 1.87c.65.76 1.17 1.75 1.17 2.6 0 2.57-2.07 4.14-4.48 4.14-.15 0-.3-.01-.44-.03z" fill="#4CAF50"/>
        <path d="M12.44 14.18c-1-.75-1.69-1.56-1.69-2.41s.69-1.65 1.69-2.41c1.27-1 2.58-.23 2.58 1.18v2.48c0 1.41-1.31 2.18-2.58 1.18zm-4.32 0c-1-.75-1.69-1.56-1.69-2.41s.69-1.65 1.69-2.41c1.27-1 2.58-.23 2.58 1.18v2.48c0 1.41-1.31 2.18-2.58 1.18zM7.56 4.31C6.31 4.05 5.25 4.93 5.25 6.13c0 1.66 1.55 3.69 2.58 3.69.33 0 .61-.14.84-.38.24-.23.38-.51.38-.85V6.13c0-1.56-1.12-2.59-2.49-2.2zM14.56 4.31c-1.37-.32-2.49.71-2.49 2.27v2.45c0 .34.14.62.38.85s.51.38.84.38c1.03 0 1.55-2.03 1.55-3.69c0-1.2-.94-2.1-2.18-2.26z" fill="#3E863D"/>
    </svg>
);
const TableauIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M3 11H10V4H3V11ZM3 20H10V13H3V20ZM12 11H19V4H12V11ZM12 20H19V13H12V20Z" fill="#E97627"/>
        <path d="M4 12H11V5H4V12ZM4 21H11V14H4V21ZM13 12H20V5H13V12ZM13 21H20V14H13V21Z" fill="#52B8D3"/>
    </svg>
);
const PowerBiIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} viewBox="0 0 24 24"><path fill="#F2C811" d="M3 3h10v4H3zM3 9h10v12H3zm12-6h6v8h-6zm0 10h6v6h-6z" /></svg>;
const MatplotlibIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="6" cy="17" r="2" fill="#1f77b4"/>
        <circle cx="12" cy="7" r="2" fill="#ff7f0e"/>
        <circle cx="18" cy="14" r="2" fill="#2ca02c"/>
        <path d="M6 17L12 7" stroke="#d62728" strokeWidth="1"/>
        <path d="M12 7L18 14" stroke="#9467bd" strokeWidth="1"/>
    </svg>
);
const ExcelIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M2 2H22V22H2V2Z" fill="#217346"/>
        <path d="M14.5 12L12 9.5L9.5 12L7 9.5L9.5 7L12 9.5L14.5 7L17 9.5L14.5 12Z" fill="#FFFFFF"/>
        <path d="M6 4H18V20H6V4Z" fill="none" stroke="#FFFFFF" strokeWidth="1"/>
        <path d="M6 10H18" stroke="#FFFFFF" strokeWidth="1"/>
        <path d="M12 4V20" stroke="#FFFFFF" strokeWidth="1"/>
    </svg>
);
const GitIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M22.2 9.6c.1-1.3-.2-2.6-1-3.6-1.1-1.4-2.9-2.2-4.7-2-1.9.2-3.6 1.2-4.5 2.8l-6.4 11c-.3.5-.2 1.1.2 1.5.4.4 1 .5 1.5.2l3.2-1.8v-5.7c0-.2.1-.4.2-.5.1-.1.3-.2.5-.2h1.5c.2 0 .4.1.5.2.1.1.2.3.2.5v7.5c0 .3-.1.5-.3.7-.2.2-.4.3-.7.3h-.8c-.6 0-1.1-.2-1.5-.6L2.8 13c-.4-.4-.5-1-.2-1.5l6.4-11C9.9 -1 15.6.3 19.8 4.5c1.1 1.1 1.8 2.5 1.9 4 .1.5-.2.9-.6 1.1l-1.8 1.1c-.5.3-1.1.1-1.4-.4-.5-.8-1.4-1.2-2.4-1.1-1.3.1-2.4 1-2.7 2.3-.3 1.2.2 2.5 1.2 3.2.7.5 1.6.6 2.5.3l3.2-1.8c.5-.3.7-.8.6-1.3z" fill="#F05033"/>
    <circle cx="6.7" cy="18.8" r="2.5" fill="#F05033"/>
    <circle cx="15.2" cy="7.1" r="2.5" fill="#F05033"/>
  </svg>
);
const AirflowIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#00B1E4"/>
        <path d="M12 7.27l-4.24 4.24 1.41 1.41L12 10.1l2.83 2.83 1.41-1.41L12 7.27zm0 6.46l-4.24 4.24 1.41 1.41L12 16.54l2.83 2.83 1.41-1.41L12 13.73z" fill="#00B1E4"/>
    </svg>
);

const initialTechStacks: TechStack[] = [
  {
    category: 'Code & Core Languages',
    Icon: Code,
    technologies: [
      { name: 'Python', Icon: PythonIcon },
      { name: 'Java', Icon: JavaIcon },
      { name: 'R', Icon: RIcon },
      { name: 'SQL', Icon: Database },
      { name: 'Bash', Icon: ShellIcon },
      { name: 'JavaScript', Icon: JsIcon },
      { name: 'C', Icon: CIcon },
      { name: 'C++', Icon: CppIcon },
      { name: 'Shell', Icon: ShellIcon },
    ],
  },
  {
    category: 'AI/ML Toolkits',
    Icon: Layers,
    technologies: [
      { name: 'TensorFlow', Icon: TensorFlowIcon },
      { name: 'PyTorch', Icon: PyTorchIcon },
      { name: 'Scikit-learn', Icon: BrainCircuit },
      { name: 'Hugging Face', Icon: HuggingFaceIcon },
      { name: 'LangChain', Icon: LangChainIcon },
      { name: 'OpenCV', Icon: Cpu },
      { name: 'Jupyter', Icon: Cpu },
      { name: 'Streamlit', Icon: Cpu },
    ]
  },
  {
    category: 'Data Engineering & Pipeline',
    Icon: Server,
    technologies: [
      { name: 'Apache Spark', Icon: Cpu },
      { name: 'PySpark', Icon: PythonIcon },
      { name: 'Airflow', Icon: AirflowIcon },
      { name: 'DBT', Icon: Cpu },
      { name: 'Docker', Icon: DockerIcon },
      { name: 'Kafka', Icon: Cpu },
      { name: 'ETL', Icon: Cpu },
      { name: 'ELT', Icon: Cpu },
      { name: 'Apache Flink', Icon: Cpu },
    ]
  },
  {
    category: 'Cloud & MLOps Arsenal',
    Icon: Cloud,
    technologies: [
      { name: 'AWS S3', Icon: AwsIcon },
      { name: 'AWS Lambda', Icon: AwsIcon },
      { name: 'AWS Glue', Icon: AwsIcon },
      { name: 'Redshift', Icon: AwsIcon },
      { name: 'Azure Databricks', Icon: AzureIcon },
      { name: 'Azure ADF', Icon: AzureIcon },
      { name: 'Azure DLS', Icon: AzureIcon },
      { name: 'Git', Icon: GitIcon },
      { name: 'CI/CD', Icon: Cpu },
      { name: 'MLflow', Icon: Cpu },
      { name: 'GitHub Actions', Icon: GitBranch },
    ]
  },
  {
    category: 'Databases & Query Engines',
    Icon: Database,
    technologies: [
      { name: 'PostgreSQL', Icon: PostgreSqlIcon },
      { name: 'MySQL', Icon: MySqlIcon },
      { name: 'MSSQL', Icon: Database },
      { name: 'MongoDB', Icon: MongoDbIcon },
      { name: 'DynamoDB', Icon: AwsIcon },
      { name: 'Redshift', Icon: AwsIcon },
      { name: 'NoSQL', Icon: Database },
    ]
  },
  {
    category: 'Dashboards & Data Viz',
    Icon: AreaChart,
    technologies: [
      { name: 'Tableau', Icon: TableauIcon },
      { name: 'Power BI', Icon: PowerBiIcon },
      { name: 'Seaborn', Icon: Cpu },
      { name: 'Matplotlib', Icon: MatplotlibIcon },
      { name: 'Excel', Icon: ExcelIcon },
      { name: 'KPI Dashboards', Icon: SlidersHorizontal },
    ]
  },
];


export function TechStacks() {
  const [techStacks, setTechStacks] = useState<TechStack[]>(initialTechStacks)
  const [isLoading, setIsLoading] = useState(false)

  return (
    <section id="tech-stacks" className="py-24 sm:py-32">
       <TooltipProvider>
        <div className="container mx-auto">
          <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">My Tech Arsenal</h2>
              <p className="mt-2 text-lg text-primary transition-all duration-300 hover:[text-shadow:0_0_15px_hsl(var(--primary))]">From code to cloud: Here’s what powers my work in building elegant, intelligent solutions.</p>
          </div>

          <div className="mt-16 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => <TechCardSkeleton key={i} />)
            ) : (
              techStacks.map((stack) => <TechCard key={stack.category} {...stack} />)
            )}
          </div>
        </div>
      </TooltipProvider>
    </section>
  )
}

function TechCard({ category, Icon, technologies }: TechStack) {
  return (
    <Card className="flex flex-col bg-background/50 backdrop-blur-sm shadow-lg transition-transform-shadow duration-300 hover:shadow-glow-primary hover:-translate-y-1">
      <CardHeader className="flex-row items-center gap-4 space-y-0">
        <Icon className="w-8 h-8 text-primary" />
        <CardTitle className="font-headline">{category}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow pt-2">
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-x-4 gap-y-6">
          {technologies.map(({ name, Icon: TechIcon }) => (
             <Tooltip key={name}>
              <TooltipTrigger asChild>
                <div className="flex flex-col items-center justify-start gap-2">
                  <TechIcon className="w-8 h-8" />
                  <span className="text-xs text-center text-muted-foreground truncate w-full">{name}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function TechCardSkeleton() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex-row items-center gap-4 space-y-0">
        <Skeleton className="w-8 h-8 rounded-full" />
        <Skeleton className="h-6 w-3/4" />
      </CardHeader>
      <CardContent className="flex-grow pt-2">
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-x-4 gap-y-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <Skeleton className="w-8 h-8 rounded-md" />
              <Skeleton className="h-4 w-12" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
