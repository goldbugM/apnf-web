"use client";

import { useEffect } from "react";
import { boot } from "@/lib/choreography";
import Overlays from "@/components/Overlays";
import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import Bureau from "@/components/sections/Bureau";
import Guides from "@/components/sections/Guides";
import LineSec from "@/components/sections/LineSec";
import Book from "@/components/sections/Book";
import Vista from "@/components/sections/Vista";
import Disciplines from "@/components/sections/Disciplines";
import Tariff from "@/components/sections/Tariff";
import Whiteout from "@/components/sections/Whiteout";
import Logbook from "@/components/sections/Logbook";
import Register from "@/components/sections/Register";
import Reports from "@/components/sections/Reports";
import Refuge from "@/components/sections/Refuge";
import Footer from "@/components/sections/Footer";

export default function Massif() {
  useEffect(() => {
    const destroy = boot();
    return destroy;
  }, []);

  return (
    <>
      <Overlays />
      <Nav />
      <main id="top">
        <Hero />
        <Bureau />
        <Guides />
        <LineSec />
        <Book />
        <Vista />
        <Disciplines />
        <Tariff />
        <Whiteout />
        <Logbook />
        <Register />
        <Reports />
        <Refuge />
        <Footer />
      </main>
    </>
  );
}
