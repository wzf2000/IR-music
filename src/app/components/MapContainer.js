import { useEffect, useState } from "react";
import styles from "./MapContainer.css";
import AMapLoader from "@amap/amap-jsapi-loader";

export default function MapContainer(props) {
  let address = props.address;
  let city = props.city;
  let lng = props.lng;
  let lat = props.lat;
  let map = null;
  let [globalAMap, setGlobalAMap] = useState(null);

  let stylesArray = [
    {
      icon: { //图标样式
        img: "/marker.svg", //图片地址
        size: [16, 16], //图标的原始大小
        anchor: "bottom-center", //锚点位置
        fitZoom: 14, //最合适的级别 在此级别显示为图标原始大小
        scaleFactor: 2, //地图放大一级的缩放比例系数 
        maxScale: 2, //图片的最大放大比例，随着地图放大图标会跟着放大，最大为2
        minScale: 1, //图片的最小缩小比例，随着地图缩小图标会跟着缩小，最小为1
      },
      label: {
        content: address.split(' ').slice(-1),
        position: "MR",
        minZoom: 15,
      },
    }
  ];

  var zoomStyleMapping = {
    14: 0,
    15: 0,
    16: 0,
    17: 0,
    18: 0,
    19: 0,
    20: 0,
  };

  let drawMap = (AMap) => {
    if (
      city === "城市未知" ||
      city === undefined ||
      address === "地点待确定" ||
      address === undefined
    )
      return;
    AMap.plugin("AMap.Geocoder", function () {
      let geocoder = new AMap.Geocoder({
        city: city,
      });
      if (lng !== undefined && lat !== undefined) {
        map = new AMap.Map("container", {
          // 设置地图容器id
          viewMode: "3D", // 是否为3D地图模式
          zoom: 15, // 初始化地图级别
          center: [lng, lat], // 初始化地图中心点位置
        });
        AMap.plugin(["AMap.ElasticMarker"], function () {
          var elasticMarker = new AMap.ElasticMarker({
            title: address, //点标记的标题
            position: [lng, lat], //点标记位置
            styles: stylesArray, //指定样式列表
            zoomStyleMapping: zoomStyleMapping, //指定 zoom 与样式的映射
          });
          map.add(elasticMarker); //添加到地图上
          map.setFitView(); //缩放地图到合适的视野级别
        });
      } else {
        geocoder.getLocation(address, function (status, result) {
          if (status === "complete" && result.info === "OK") {
            let location = result.geocodes[0].location;
            map = new AMap.Map("container", {
              // 设置地图容器id
              viewMode: "3D", // 是否为3D地图模式
              zoom: 10, // 初始化地图级别
              center: location, // 初始化地图中心点位置
            });
            AMap.plugin(["AMap.ElasticMarker"], function () {
              var elasticMarker = new AMap.ElasticMarker({
                title: address, //点标记的标题
                position: location, //点标记位置
                styles: stylesArray, //指定样式列表
                zoomStyleMapping: zoomStyleMapping, //指定 zoom 与样式的映射
              });
              map.add(elasticMarker); //添加到地图上
              map.setFitView(); //缩放地图到合适的视野级别
            });
          }
        });
      }
    });
  };

  useEffect(() => {
    window._AMapSecurityConfig = {
      securityJsCode: "9fafda6bb22204f569c000a8cd62bc1f",
    };
    if (globalAMap === null) {
      AMapLoader.load({
        key: "c9020fcf56e3d78809895825c68f439e", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ["AMap.Geocoder", "AMap.ElasticMarker"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      })
        .then((AMap) => {
          setGlobalAMap(AMap);
          drawMap(AMap);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      console.log("AMap is already loaded");
      drawMap(globalAMap);
    }

    return () => {
      map?.destroy();
    };
  }, [address]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      id="container"
      className={styles.container}
      style={{ height: "100%", width: "100%" }}
    ></div>
  );
}
