# Solidown

A high performance markdown component for SolidJS

## Note:
This component is efficientand works well,
but I have started using [zero-md](https://zerodevx.github.io/zero-md/) in my own website,
and it's very good as well.

Just a heads up :)

## Installation
```
npm i solidown
```

## Usage & Examples
```jsx
import Solidown from "solidown"

// simple markdown renderer
<Solidown>{`
# Test
**bold *and italic***
`}</Solidown>

// rendering from URL
<Solidown src="https://raw.githubusercontent.com/yellowsink/solidown/master/README.md" />

// with custom loading text
<Solidown
    src=""
    loading="Grabbing markdown, pls wait..."
    />

// with custom loading DOM (using tailwind here to make styles simpler but thats unrelated)
<Solidown
    src=""
    loading={(
        <div class="text-4xl text-center italic">Loading</div>
    )}
    />

// with extra styles
<Solidown
    css={`
        #solidown-markdown-root h1 {
            text-decoration-line: underline;
        }
    `}>{`
# Test
**bold *and italic***
`}</Solidown>
```
