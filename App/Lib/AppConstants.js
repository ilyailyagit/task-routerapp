import {Colors} from "../Themes";

export const imageOptions = {
  mediaType: 'photo',
  cropping: true,
  compressImageMaxWidth: 1600,
  compressImageMaxHeight: 1600,
  compressImageQuality: 0.9
}
export const photosPermissionTypes = {
  CAMERA: 'camera',
  PHOTOS: 'photo'
}

export const Activity_category = [{
  value: 'Category 1',
}, {
  value: 'Category 2',
}, {
  value: 'Category 3',
}];

export const Priority_Types = [
  {
    id: 1,
    color: Colors.orange
  }, {
    id: 2,
    color: Colors.yellow
  }, {
    id: 3,
    color: Colors.green
  }
]

export const Folders = [
    'Random Stuff',
    'Activities',
    'Errands',
    'Tasks'
]

export const ActivityActions = [
  {
    id: 1,
    title: 'DELETE',
    color: Colors.orange
  },
  {
    id: 2,
    title: 'CANCEL',
    color: Colors.yellow
  },
  {
    id: 3,
    title: 'CREATE ROUTE',
    color: Colors.green
  }
]
