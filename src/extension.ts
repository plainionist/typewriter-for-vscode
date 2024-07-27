'use strict'

import * as vscode from 'vscode'
import { type, pause } from './humanTyper'

let typewriterBuffer: string

export function activate(context: vscode.ExtensionContext) {
  let playTypewriterCmd = vscode.commands.registerCommand('typewriter.playback', () => {
    let speed = vscode.workspace.getConfiguration('typewriter').get<number>('TypingSpeed') | 60
    type(typewriterBuffer, speed)
  })

  let setTypewriterCmd = vscode.commands.registerCommand('typewriter.setTypewriter', () => {
    var editor = vscode.window.activeTextEditor
    if (!editor) {
      return
    }
    var selection = editor.selection
    typewriterBuffer = editor.document.getText(selection)
  })

  let pausePlaybackCmd = vscode.commands.registerCommand('typewriter.pause', () => {
    pause()
  })

  context.subscriptions.push(playTypewriterCmd)
  context.subscriptions.push(setTypewriterCmd)
  context.subscriptions.push(pausePlaybackCmd)
}

export function deactivate() {}
