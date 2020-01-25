// if (process.env.NODE_ENV !== "production") module.hot.accept();

import style from './style/main.styl'

import {html, define} from 'hybrids'
import * as glElements from './gl'

define("app-root", {
  render: () => html`
    <gl-canvas id="gl-canvas" width="100vw" height="100vh" clear-color="0x35383a">
      <gl-record filename="TODO"></gl-record>
      <gl-camera id="camera" type="perspective" fov="75" near="0.1" far="1000" position="${[-0.4, 0.3, 1]}">
        <gl-orbit-control></gl-orbit-control>
      </gl-camera>
      <gl-point-light position="${[0.5, 0, -3]}" intensity="3" distance="0" decay="1" helper></gl-point-light>
      <gl-directional-light target="camera" position="${[2, 3, 2]}" intensity="5" helper></gl-directional-light>
      <!-- <gl-directional-light position="${[-2, 3, 2]}" intensity="4" helper></gl-directional-light> -->

      <!-- <gl-mesh name="mesh" bbox>
        <gl-geometry></gl-geometry>
        <gl-material></gl-material>
      </gl-mesh> -->
      <!-- <gl-model type="gltf" src="/static/models/scifi-helmet/SciFiHelmet.gltf"></gl-model> -->
      <gl-model type="gltf" src="/static/models/flight-helmet/FlightHelmet.gltf" position="${[0, 0.1, 0]}"></gl-model>
    </gl-canvas>
  `.define({...glElements}),
})

const globalStyle = document.createElement('style')
globalStyle.innerHTML = style.toString()
document.head.appendChild(globalStyle)