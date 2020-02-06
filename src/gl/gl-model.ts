import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import { Hybrids, property, html } from "hybrids"
import { mapToEnum } from "../util/Map"
import glObject from './base/glObject'
import sceneObject from 'src/factory/sceneObject'
import { Object3D } from 'three'

enum MODEL_TYPE {
  gltf = 'GLTF'
}

const fetchModel = (src) => new Promise((res, rej) =>
  new GLTFLoader().load(src, (gltf) => res(gltf), null, rej))

interface GlModel extends HTMLElement {
  [key: string]: any
}

export default {
  ...glObject(({model}) => model),
  type: property(mapToEnum.bind(null, MODEL_TYPE, MODEL_TYPE.gltf)),
  src: {
    ...property(''),
    observe: (host, value) => {
      value && fetchModel(value).then(({scene}) => host.model = scene)
    },
  },
  model: sceneObject({
    get: (host, value) => value,
    set: (host, value) => value,
  }),
} as Hybrids<GlModel>

