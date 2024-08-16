import "@testing-library/jest-dom"
import { describe, expect, it } from "vitest"

import { App } from "./App"
import { render } from "@testing-library/react"

describe("App", () => {
    it("renders the app", () => {
        const { getByRole } = render(<App />)
        const app = getByRole("app")

        expect(app).toBeInTheDocument()
    })
})
