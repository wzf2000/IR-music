import { useEffect, useState } from "react";
import styles from "./MapContainer.css";
import AMapLoader from "@amap/amap-jsapi-loader";

export default function MapContainer(props) {
  let map = null;
  let address = props.address;
  let city = props.city;
  let lng = props.lng;
  let lat = props.lat;
  let [globalAMap, setGlobalAMap] = useState(null);

  let drawMap = (AMap) => {
    if (city === '城市未知' || city === undefined || address === '地点待确定' || address === undefined)
      return;
    AMap.plugin('AMap.Geocoder', function () {
      let geocoder = new AMap.Geocoder({
        'city': city,
      });
      if (lng !== undefined && lat !== undefined) {
        map = new AMap.Map("container", {
          // 设置地图容器id
          viewMode: "3D", // 是否为3D地图模式
          zoom: 15, // 初始化地图级别
          center: [lng, lat], // 初始化地图中心点位置
        });
      } else {
        geocoder.getLocation(address, function (status, result) {
          if (status === 'complete' && result.info === 'OK') {
            let location = result.geocodes[0].location;
            map = new AMap.Map("container", {
              // 设置地图容器id
              viewMode: "3D", // 是否为3D地图模式
              zoom: 15, // 初始化地图级别
              center: location, // 初始化地图中心点位置
            });
          }
        });
      }
    });
  }

  useEffect(() => {
    window._AMapSecurityConfig = {
      securityJsCode: "9fafda6bb22204f569c000a8cd62bc1f",
    };
    if (globalAMap === null) {
      AMapLoader.load({
        key: "c9020fcf56e3d78809895825c68f439e", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ['AMap.Geocoder'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      })
        .then((AMap) => {
          setGlobalAMap(AMap);
          drawMap(AMap);
        })
        .catch((e) => {
          console.log(e);
        });
      } else {
        console.log('AMap is already loaded');
        drawMap(globalAMap);
      }

    return () => {
      map?.destroy();
    };
  }, [address]);

  return (
    <div
      id="container"
      className={styles.container}
      style={{ height: "100%", width: "100%" }}
    ></div>
  );
}
