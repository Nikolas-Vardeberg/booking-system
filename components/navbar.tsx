"use client"

import Link from "next/link"
import { Button, buttonVariants } from "./ui/button"
import { ArrowRight } from "lucide-react"
import { useParams, usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
    navigationMenuTriggerStyle,
  } from "@/components/ui/navigation-menu"
import MaxWidthWrapper from "./MaxWidthWrapper"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTrigger } from "./ui/sheet";

import { AlignJustify, ArrowDown } from "lucide-react";
import { AvatarIcon } from "@radix-ui/react-icons";
import React from "react"

  
  const components: { title: string; href: string; description: string }[] = [
    {
      title: "Om Oss",
      href: "/om-oss",
      description:
        "Les mer om selskapet og selskapet visjon",
    },
    {
      title: "Gi Oss Ros",
      href: "/om-meg",
      description:
        "Gi en vurdering på servicen som ble utført",
    },
    {
      title: "Ta Kontakt",
      href: "/kontakt",
      description:
        "Har du spørsmål eller vil diskutere et potensielt prosjekt? Ikke nøl med å ta kontakt med meg direkte.",
    },
    {
      title: "Admin Login",
      href: "https://github.com/Nikolas-Vardeberg",
      description: "Login for admin brukere som kontrollere siden",
    },
  ]

export default function Navbar() {
    return(
      <div className="sticky inset-x-0 top-0 z-30 bg-background transition-all">
        <MaxWidthWrapper className="">
        <nav className="w-full relative flex items-center justify-between mx-auto px-12 py-5">
           
            <Link href="/" className="font-bold text-l">
                Innlandet Transport
            </Link>

            <div>
            <NavigationMenu>
                <NavigationMenuList className="hidden md:flex md:space-x-4">
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <a
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                              href="/"
                            >
                              <AvatarIcon className="h-6 w-6" />
                              <div className="mb-2 mt-4 text-lg font-medium">
                                Innlandet Lokal Transport
                              </div>
                            </a>
                          </NavigationMenuLink>
                        </li>
                        <ListItem href="/om-oss" title="Om Selskapet">
                        Utforsk mine prosjekter og oppdag mitt arbeid.
                        </ListItem>
                        <ListItem href="/kontakt" title="Ta Kontakt">
                        Har du spørsmål eller vil diskutere et potensielt prosjekt?
                        </ListItem>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Om oss</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                        {components.map((component) => (
                          <ListItem
                            key={component.title}
                            title={component.title}
                            href={component.href}
                          >
                            {component.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/kontakt" legacyBehavior passHref>
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Ta Kontakt
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            <div className="md:hidden">
            <Sheet>
                <SheetTrigger>
                    <AlignJustify />
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetDescription>
                            <div className="flex flex-col space-y-6 items-start w-full text-lg mt-10 text-primary">
                                <Link
                                href="/"
                                >
                                    Prosjekter
                                </Link>
                                <Link
                                href="/"
                                >
                                   Ta Kontakt
                                </Link>
                                <Link
                                href="/"
                                >
                                    Om Meg
                                </Link>
                                <Link
                                href="/"
                                >
                                    Github Profil
                                </Link>
                            </div>
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
            </div>

           
            <Link className={buttonVariants({  size: "default", className: "max-md:hidden" })}
                href="/dashboard" target="_blank"
              >
                Ta Kontakt <ArrowRight className="ml-2 h-5 w-5" />
              </Link>

        </nav>
        </MaxWidthWrapper>
        </div>
    )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"