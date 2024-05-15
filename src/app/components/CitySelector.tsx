import * as React from 'react';
import Autocomplete from '@mui/joy/Autocomplete';
import AutocompleteOption from '@mui/joy/AutocompleteOption';
import FormControl, { FormControlProps } from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Typography from '@mui/joy/Typography';

import { CityType } from '@/app/utils/types';

interface CitySelectorProps extends FormControlProps {
  city: CityType;
  setCity: (city: CityType) => void;
};

export default function CitySelector(props: CitySelectorProps) {
  const { sx, city, setCity, ...other } = props;
  return (
    <FormControl {...other} sx={sx}>
      <FormLabel>城市</FormLabel>
      <Autocomplete
        autoHighlight
        isOptionEqualToValue={(option, value) => option.code === value.code}
        defaultValue={{ code: '000000', label: '所有城市', province: '所有城市' }}
        value={city}
        onChange={(_, newValue) => {
          if (newValue) {
            setCity(newValue);
          }
        }}
        options={cities}
        renderOption={(optionProps, option) => (
          <AutocompleteOption {...optionProps}>
            {option.label}
            <Typography component="span" textColor="text.tertiary" ml={0.5}>
              ({option.code})
            </Typography>
          </AutocompleteOption>
        )}
        slotProps={{
          input: {
            autoComplete: 'new-password', // disable autocomplete and autofill
          },
        }}
      />
    </FormControl>
  );
}

const cities: readonly CityType[] = [
  { code: '000000', label: '所有城市', province: '所有城市', suggested: true },
  { code: '100000', label: '国际及港澳台', province: '国际及港澳台' },
  { code: '110000', label: '北京市', province: '北京市 ' },
  { code: '120000', label: '天津市', province: '天津市 ' },
  { code: '130100', label: '石家庄市', province: '河北省 ' },
  { code: '130200', label: '唐山市', province: '河北省 ' },
  { code: '130300', label: '秦皇岛市', province: '河北省 ' },
  { code: '130700', label: '张家口市', province: '河北省 ' },
  { code: '131000', label: '廊坊市', province: '河北省 ' },
  { code: '140100', label: '太原市', province: '山西省' },
  { code: '140200', label: '大同市', province: '山西省' },
  { code: '140400', label: '长治市', province: '山西省' },
  { code: '140700', label: '晋中市', province: '山西省' },
  { code: '150100', label: '呼和浩特市', province: '内蒙古自治区' },
  { code: '150200', label: '包头市', province: '内蒙古自治区' },
  { code: '150600', label: '鄂尔多斯市', province: '内蒙古自治区' },
  { code: '210100', label: '沈阳市', province: '辽宁省' },
  { code: '210200', label: '大连市', province: '辽宁省' },
  { code: '210300', label: '鞍山市', province: '辽宁省' },
  { code: '210700', label: '锦州市', province: '辽宁省' },
  { code: '211000', label: '辽阳市', province: '辽宁省' },
  { code: '220100', label: '长春市', province: '吉林省' },
  { code: '220200', label: '吉林市', province: '吉林省' },
  { code: '230100', label: '哈尔滨市', province: '黑龙江省' },
  { code: '230200', label: '齐齐哈尔市', province: '黑龙江省' },
  { code: '230600', label: '大庆市', province: '黑龙江省' },
  { code: '310000', label: '上海市', province: '上海市' },
  { code: '320100', label: '南京市', province: '江苏省' },
  { code: '320200', label: '无锡市', province: '江苏省' },
  { code: '320300', label: '徐州市', province: '江苏省' },
  { code: '320400', label: '常州市', province: '江苏省' },
  { code: '320500', label: '苏州市', province: '江苏省' },
  { code: '320600', label: '南通市', province: '江苏省' },
  { code: '320700', label: '连云港市', province: '江苏省' },
  { code: '321000', label: '扬州市', province: '江苏省' },
  { code: '321200', label: '泰州市', province: '江苏省' },
  { code: '330100', label: '杭州市', province: '浙江省' },
  { code: '330200', label: '宁波市', province: '浙江省' },
  { code: '330300', label: '温州市', province: '浙江省' },
  { code: '330400', label: '嘉兴市', province: '浙江省' },
  { code: '330500', label: '湖州市', province: '浙江省' },
  { code: '330600', label: '绍兴市', province: '浙江省' },
  { code: '330700', label: '金华市', province: '浙江省' },
  { code: '331000', label: '台州市', province: '浙江省' },
  { code: '340100', label: '合肥市', province: '安徽省' },
  { code: '340300', label: '蚌埠市', province: '安徽省' },
  { code: '340500', label: '马鞍山市', province: '安徽省' },
  { code: '340800', label: '安庆市', province: '安徽省' },
  { code: '350100', label: '福州市', province: '福建省' },
  { code: '350200', label: '厦门市', province: '福建省' },
  { code: '350400', label: '三明市', province: '福建省' },
  { code: '350500', label: '泉州市', province: '福建省' },
  { code: '350600', label: '漳州市', province: '福建省' },
  { code: '360100', label: '南昌市', province: '江西省' },
  { code: '370100', label: '济南市', province: '山东省' },
  { code: '370200', label: '青岛市', province: '山东省' },
  { code: '370300', label: '淄博市', province: '山东省' },
  { code: '370500', label: '东营市', province: '山东省' },
  { code: '370600', label: '烟台市', province: '山东省' },
  { code: '370700', label: '潍坊市', province: '山东省' },
  { code: '370800', label: '济宁市', province: '山东省' },
  { code: '370900', label: '泰安市', province: '山东省' },
  { code: '371100', label: '日照市', province: '山东省' },
  { code: '371400', label: '德州市', province: '山东省' },
  { code: '371500', label: '聊城市', province: '山东省' },
  { code: '371600', label: '滨州市', province: '山东省' },
  { code: '410100', label: '郑州市', province: '河南省' },
  { code: '410200', label: '开封市', province: '河南省' },
  { code: '410300', label: '洛阳市', province: '河南省' },
  { code: '410500', label: '安阳市', province: '河南省' },
  { code: '410700', label: '新乡市', province: '河南省' },
  { code: '410900', label: '濮阳市', province: '河南省' },
  { code: '411300', label: '南阳市', province: '河南省' },
  { code: '411400', label: '商丘市', province: '河南省' },
  { code: '420100', label: '武汉市', province: '湖北省 ' },
  { code: '420500', label: '宜昌市', province: '湖北省 ' },
  { code: '421100', label: '黄冈市', province: '湖北省 ' },
  { code: '422800', label: '恩施土家族苗族自治州', province: '湖北省 ' },
  { code: '430100', label: '长沙市', province: '湖南省' },
  { code: '430200', label: '株洲市', province: '湖南省' },
  { code: '430300', label: '湘潭市', province: '湖南省' },
  { code: '431100', label: '永州市', province: '湖南省' },
  { code: '440100', label: '广州市', province: '广东省' },
  { code: '440300', label: '深圳市', province: '广东省' },
  { code: '440400', label: '珠海市', province: '广东省' },
  { code: '440600', label: '佛山市', province: '广东省' },
  { code: '440700', label: '江门市', province: '广东省' },
  { code: '441000', label: '海口市', province: '广东省' },
  { code: '441200', label: '肇庆市', province: '广东省' },
  { code: '441300', label: '惠州市', province: '广东省' },
  { code: '441400', label: '梅州市', province: '广东省' },
  { code: '441900', label: '东莞市', province: '广东省' },
  { code: '442000', label: '中山市', province: '广东省' },
  { code: '445200', label: '揭阳市', province: '广东省' },
  { code: '450100', label: '南宁市', province: '广西壮族自治区' },
  { code: '450200', label: '柳州市', province: '广西壮族自治区' },
  { code: '450300', label: '桂林市', province: '广西壮族自治区' },
  { code: '450500', label: '北海市', province: '广西壮族自治区' },
  { code: '500000', label: '重庆市', province: '重庆市' },
  { code: '510100', label: '成都市', province: '四川省 ' },
  { code: '510600', label: '德阳市', province: '四川省 ' },
  { code: '510700', label: '绵阳市', province: '四川省 ' },
  { code: '520100', label: '贵阳市', province: '贵州省 ' },
  { code: '520300', label: '遵义市', province: '贵州省 ' },
  { code: '530100', label: '昆明市', province: '云南省 ' },
  { code: '610100', label: '西安市', province: '陕西省 ' },
  { code: '610300', label: '宝鸡市', province: '陕西省 ' },
  { code: '610400', label: '咸阳市', province: '陕西省 ' },
  { code: '611000', label: '商洛市', province: '陕西省 ' },
  { code: '620100', label: '兰州市', province: '甘肃省 ' },
  { code: '630100', label: '西宁市', province: '青海省 ' },
  { code: '640100', label: '银川市', province: '宁夏回族自治区 ' },
  { code: '650100', label: '乌鲁木齐市', province: '新疆维吾尔自治区 ' },
  { code: '652300', label: '昌吉回族自治州', province: '新疆维吾尔自治区 ' },
  { code: '810000', label: '香港特别行政区', province: '香港特别行政区 ' },
  { code: '820000', label: '澳门特别行政区', province: '澳门特别行政区 ' },
];
