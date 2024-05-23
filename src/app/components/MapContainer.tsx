import { useEffect, useRef, useState, PropsWithChildren, ComponentType } from "react";
import dynamic from "next/dynamic";
import { Provider, useMapContext, useMap } from "@uiw/react-amap";
import { APILoaderConfig } from '@uiw/react-amap-api-loader';

declare global {
  interface Window {
    _AMapSecurityConfig: {
      serviceHost: string;
    };
  }
}

export interface MapContainerProps {
  address: string,
  city: string,
  lng?: number,
  lat?: number,
};

if (typeof window !== "undefined") {
  window._AMapSecurityConfig = {
    serviceHost: "http://proxy.wzf2000.top/_AMapService",
  };
}

const MyMap = (props: MapContainerProps) => {
  const { address, city, lng, lat } = props;
  const warpper = useRef(null);
  const { map, state } = useMapContext();
  const [marker, setMarker] = useState<AMap.Marker | undefined>(undefined);
  const { setContainer } = useMap({
    container: warpper.current,
    center: lng && lat ? new AMap.LngLat(lng, lat) : undefined,
    zoom: 10
  });

  useEffect(() => {
    if (!lng || !lat) {
      return;
    }
    if (map) {
      map.setZoom(15);
      if (marker) {
        marker.setMap(null);
      }
      const newMarker = new AMap.Marker({
        icon: new AMap.Icon({
          imageSize: new AMap.Size(25, 34),
          image: "/marker.svg"
        }),
        position: new AMap.LngLat(lng, lat),
        offset: new AMap.Pixel(-13, -30),
        title: address,
      });
      newMarker.setMap(state.map ? state.map : null);
      setMarker(newMarker);
    }
  }, [map, lng, lat]);
  
  useEffect(() => {
    if (warpper.current) {
      setContainer(warpper.current);
    }
  }, [warpper.current]);

  return <div ref={warpper} style={{ height: "100%", width: "100%" }} />;
};

const APILoader: ComponentType<PropsWithChildren<APILoaderConfig>> | undefined = typeof window !== "undefined" ? dynamic(
  () => import('@uiw/react-amap-api-loader').then((mod: any) => mod.APILoader),
  { ssr: false },
) : undefined;

const MapContainer = (props: MapContainerProps) => {
  return APILoader ? (
    <APILoader version="2.0.5" akey="c9020fcf56e3d78809895825c68f439e">
      <Provider>
        <MyMap {...props} />
      </Provider>
    </APILoader>
  ) : (
    <div>loading...</div>
  );
};

export default MapContainer;
