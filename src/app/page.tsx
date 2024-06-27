"use client";

import { redirect } from "next/navigation";
import { useState } from "react";

export default function App() {
  redirect("/login?redirect=/lab/toolhub");
  return <div></div>;
}
