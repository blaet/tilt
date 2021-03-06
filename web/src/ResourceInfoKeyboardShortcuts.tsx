import React, { Component } from "react"
import { incr } from "./analytics"

type Link = Proto.webviewLink

type Props = {
  endpoints?: Link[]
  showSnapshotButton: boolean
  openSnapshotModal: () => void
  openEndpointUrl: (url: string) => void
}

const keyCodeOne = 49
const keyCodeNine = 57

/**
 * Sets up keyboard shortcuts that depend on the state of the current resource.
 */
class ResourceInfoKeyboardShortcuts extends Component<Props> {
  constructor(props: Props) {
    super(props)
    this.onKeydown = this.onKeydown.bind(this)
  }

  componentDidMount() {
    document.body.addEventListener("keydown", this.onKeydown)
  }

  componentWillUnmount() {
    document.body.removeEventListener("keydown", this.onKeydown)
  }

  onKeydown(e: KeyboardEvent) {
    if (e.metaKey || e.altKey || e.ctrlKey || e.isComposing) {
      return
    }

    if (e.keyCode >= keyCodeOne && e.keyCode <= keyCodeNine && e.shiftKey) {
      let endpointIndex = e.keyCode - keyCodeOne
      let endpoint = this.props.endpoints && this.props.endpoints[endpointIndex]
      if (!endpoint || !endpoint.url) {
        return
      }

      incr("ui.web.endpoint", { action: "shortcut" })
      this.props.openEndpointUrl(endpoint.url)
      e.preventDefault()
      return
    }

    if (e.shiftKey) {
      return
    }

    switch (e.key) {
      case "s":
        if (!this.props.showSnapshotButton) {
          return
        }
        this.props.openSnapshotModal()
        e.preventDefault()
        break
    }
  }

  render() {
    return <span></span>
  }
}

export default ResourceInfoKeyboardShortcuts
