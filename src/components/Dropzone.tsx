import "@uppy/core/dist/style.min.css"
import "@uppy/dashboard/dist/style.min.css"

import { Dashboard } from "@uppy/react"
import React from "react"
import { DashboardProps as UppyDashboard } from "@uppy/react/types/Dashboard"

type DashboardProps = {
  uppy: unknown
} & UppyDashboard

/**
 *
 * @link https://uppy.io/docs/react/
 */
export default function Dropzone(dashboardProps: DashboardProps) {
  return <Dashboard {...dashboardProps}/>
}
