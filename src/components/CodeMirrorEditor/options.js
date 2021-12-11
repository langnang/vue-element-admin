import package_files from "./package_files"

export const theme_options = package_files?.files?.find(v => v.type === 'directory' && v.name === 'theme')?.files?.map(v => v.name.slice(0, -4))

export const mode_options = package_files?.files?.find(v => v.type === 'directory' && v.name === 'mode')?.files?.filter(v => v.type === 'directory')

console.log(mode_options)

// export const mode_options = [
//   // CSS
//   "text/css", "text/x-scss", "text/x-less",
//   // JavaScript
//   "text/javascript", "application/javascript", "application/x-javascript", "text/ecmascript", "application/ecmascript", "application/json", "application/x-json", "application/manifest+json", "application/ld+json", "text/typescript", "application/typescript",
//   // Python, Cython
//   "text/x-python", "text/x-cython",
//   // PHP
//   "application/x-httpd-php", "text/x-php",
//   // Markdown
//   "text/x-markdown",
// ]
export const editor_configuration = {
  // value: string | CodeMirror.Doc
  // mode: string| object
  // lineSeparator: string | null
  // theme: string
  // indentUnit: integer
  // smartIndent: boolean
  // tabSize: integer
  // indentWithTabs: boolean
  // electricChars: boolean
  // specialChars: RegExp
  // specialCharPlaceholder: function(char) → Element
  // direction: "ltr" | "rtl"
  // rtlMoveVisually: boolean
  // keyMap: string
  // extraKeys: object
  // configureMouse: fn(cm: CodeMirror, repeat: "single" | "double" | "triple", event: Event) → Object
  // unit: "char" | "word" | "line" | "rectangle" | fn(CodeMirror, Pos) → { from: Pos, to: Pos }
  // extend: bool
  // addNew: bool
  // moveOnDrag: bool
  // lineWrapping: boolean
  // lineNumbers: boolean
  // firstLineNumber: integer
  // lineNumberFormatter: function(line: integer) → string
  // gutters: array < string | { className: string, style: ? string} >
  // fixedGutter: boolean
  // scrollbarStyle: string
  // coverGutterNextToScrollbar: boolean
  // inputStyle: string
  // readOnly: boolean | string
  // screenReaderLabel: string
  // showCursorWhenSelecting: boolean
  // lineWiseCopyCut: boolean
  // pasteLinesPerSelection: boolean
  // selectionsMayTouch: boolean
  // undoDepth: integer
  // historyEventDelay: integer
  // tabindex: integer
  // autofocus: boolean
  // phrases: ? object
  // dragDrop: boolean
  // allowDropFileTypes: array < string >
  // cursorBlinkRate: number
  // cursorScrollMargin: number
  // cursorHeight: number
  // singleCursorHeightPerLine: boolean
  // resetSelectionOnContextMenu: boolean
  // workTime, workDelay: number
  // pollInterval: number
  // flattenSpans: boolean
  // addModeClass: boolean
  // maxHighlightLength: number
  // viewportMargin: integer
  // spellcheck: boolean
  // autocorrect: boolean
  // autocapitalize: boolean
}
export const editor_events = {
  // "change": "(instance: CodeMirror, changeObj: object)",
  // "changes"(instance: CodeMirror, changes: array<object>)
  // "beforeChange" (instance: CodeMirror, changeObj: object)
  // "cursorActivity" (instance: CodeMirror)
  // "keyHandled" (instance: CodeMirror, name: string, event: Event)
  // "inputRead" (instance: CodeMirror, changeObj: object)
  // "electricInput" (instance: CodeMirror, line: integer)
  // "beforeSelectionChange" (instance: CodeMirror, obj: {ranges, origin, update})
  // "viewportChange" (instance: CodeMirror, from: number, to: number)
  // "swapDoc" (instance: CodeMirror, oldDoc: Doc)
  // "gutterClick" (instance: CodeMirror, line: integer, gutter: string, clickEvent: Event)
  // "gutterContextMenu" (instance: CodeMirror, line: integer, gutter: string, contextMenu: Event: Event)
  // "focus" (instance: CodeMirror, event: Event)
  // "blur" (instance: CodeMirror, event: Event)
  // "scroll" (instance: CodeMirror)
  // "refresh" (instance: CodeMirror)
  // "optionChange" (instance: CodeMirror, option: string)
  // "scrollCursorIntoView" (instance: CodeMirror, event: Event)
  // "update" (instance: CodeMirror)
  // "renderLine" (instance: CodeMirror, line: LineHandle, element: Element)
  // "mousedown", "dblclick", "touchstart", "contextmenu", "keydown", "keypress", "keyup", "cut", "copy", "paste", "dragstart", "dragenter", "dragover", "dragleave", "drop" (instance: CodeMirror, event: Event)
  // "change" (doc: CodeMirror.Doc, changeObj: object)
  // "beforeChange" (doc: CodeMirror.Doc, change: object)
  // "cursorActivity" (doc: CodeMirror.Doc)
  // "beforeSelectionChange" (doc: CodeMirror.Doc, selection: {head, anchor})
  // "delete" ()
  // "change" (line: LineHandle, changeObj: object)  // "beforeCursorEnter" ()
  // "clear" (from: {line, ch}, to: {line, ch})
  // "hide" ()
  // "unhide" ()  // "redraw" ()
}
export const editor_commands = {}
export const editor_programming_api = {}


