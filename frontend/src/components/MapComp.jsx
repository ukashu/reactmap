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
          props.setCoordinates(coordinates)
          props.setGeoCoordinates(toLonLat(coordinates[0]))
          console.log(coordinates)
          let distance = []
          for (let i = 0; i < coordinates.length - 1; i++) {
            distance.push(getDistance(toLonLat(coordinates[i]), toLonLat(coordinates[i+1])))
          }
          props.setDistance(distance)
          console.log(distance)
        });
        if (props.savedFlight) {
          let flight = JSON.parse(props.savedFlight)
          draw.appendCoordinates(JSON.parse(flight.coordinates))
          props.loadInputs("md", flight.md)
          props.loadInputs("tas", flight.tas)
          props.loadInputs("ws", flight.ws)
          props.loadInputs("wta", flight.wta)
          props.loadInputs("name", flight.name)
          draw.finishDrawing()
        }
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