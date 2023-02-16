import { useState, useRef, useEffect } from 'react'
import reactLogo from '../assets/react.svg'
import '../App.css'
import Draw from 'ol/interaction/Draw.js';
import Map from 'ol/Map.js';
import {OSM, Vector as VectorSource} from 'ol/source.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import View from 'ol/View.js';
import {getDistance} from 'ol/sphere';
import {toLonLat} from 'ol/proj';

export default function MapComp(props) {
  const [map, setMap] = useState();
  const mapElement = useRef();
  const mapRef = useRef();
  mapRef.current = map;
  
  useEffect(() => {

    //generate map layers
    const raster = new TileLayer({
      source: new OSM(),
    });

    const source = new VectorSource({wrapX: false});

    const vector = new VectorLayer({
      source: source,
    });

    const initialMap = new Map({
      layers: [raster, vector],
      target: mapElement.current,
      view: new View({
        center: [2100000, 6790000],
        zoom: 6,
      }),
    });

    //generate drawing interaction
    let draw; // global so we can remove it later
    function addInteraction() {
      const value = "LineString";
      if (value !== 'None') {
        draw = new Draw({
          source: source,
          type: value,
        });
        initialMap.addInteraction(draw);
        draw.on('drawend', async function(evt){
          let coordinates = evt.feature.getGeometry().getCoordinates()
          props.setCoordinates([coordinates[0],coordinates[1]])
          props.setGeoCoordinates(toLonLat(coordinates[0]))
          console.log(coordinates)
          let distance = getDistance(toLonLat(coordinates[0]), toLonLat(coordinates[1]))
          props.setDistance(distance)
          console.log(distance)
        });
      }
    }

    //add undo button functionality
    document.getElementById('undo').addEventListener('click', function () {
      draw.removeLastPoint();
    });

    addInteraction()

    setMap(initialMap)

    return () => {
      setMap("")
      //to prevent double rendering of map - make sure this isn't preventing any further changes to referenced node
      mapElement.current = ""
    }
  },[])

  return (
    <div className="Map">
      <div ref={mapElement} id="map"></div>
      <button id="undo">undo</button>
    </div>
  )
}