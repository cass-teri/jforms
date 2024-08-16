import { describe, expect, it } from "vitest"
import { CamelCaseToTitleCase, cn, ReplaceIllegalCharacters, ToDisplayString, ToTitleCase } from "@/lib/utils.ts"

describe("utils", () => {
    // Combine multiple class names into a single string
    describe("cn", () => {
        it("should combine multiple class names into a single string", () => {
            const result = cn("class1", "class2", "class3")

            expect(result).toBe("class1 class2 class3")
        })
    })

    describe("ToTitleCase", () => {
        it("should convert a lowercase string with underscores to title case", () => {
            const input = "hello_world_this_is_a_test"
            const expectedOutput = "Hello World This Is A Test"

            const result = ToTitleCase(input)

            expect(result).toBe(expectedOutput)
        })
        it("should return an empty string when input is empty", () => {
            const input = ""
            const expectedOutput = ""

            const result = ToTitleCase(input)

            expect(result).toBe(expectedOutput)
        })
    })

    describe("CamelCaseToTitleCase", () => {
        it("should convert a camel case string to title case", () => {
            const input = "helloWorldThisIsATest"
            const expectedOutput = "Hello World This Is A Test"

            const result = CamelCaseToTitleCase(input)

            expect(result).toBe(expectedOutput)
        })

        it("should return an empty string when input is empty", () => {
            const input = ""
            const expectedOutput = ""

            const result = CamelCaseToTitleCase(input)

            expect(result).toBe(expectedOutput)
        })
    })

    describe("ToDisplayString", () => {
        it("should convert a camel case string to title case and remove underscores", () => {
            const input = "helloWorldThisIsATest"
            const expectedOutput = "Hello World This Is A Test"

            const result = ToDisplayString(input)

            expect(result).toBe(expectedOutput)
        })

        it("should return an empty string when input is empty", () => {
            const input = ""
            const expectedOutput = ""

            const result = ToDisplayString(input)

            expect(result).toBe(expectedOutput)
        })
    })

    describe("ReplaceIllegalCharacters", () => {
        it("should replace illegal characters with underscores", () => {
            const input = "hello world! /this is a; test"
            const expectedOutput = "hello_world_this_is_a_test"

            const result = ReplaceIllegalCharacters(input)

            expect(result).toBe(expectedOutput)
        })

        it("should return an empty string when input is empty", () => {
            const input = ""
            const expectedOutput = ""

            const result = ReplaceIllegalCharacters(input)

            expect(result).toBe(expectedOutput)
        })
    })
})
