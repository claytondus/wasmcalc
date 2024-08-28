package main

//go:wasm-module yourmodulename
//export multiply
func multiply(x, y int32) int32 {
    return x * y
}

// main is required for the `wasi` target, even if it isn't used.
func main() {}
