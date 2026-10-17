import batteryPack from '@assets/bat-01_1792052493991.jpg';
import chargingHub from '@assets/voltrium-charging.jpg';
import chargerCabinet from '@assets/charger_1792052493991.jpg';
import kingLong04 from '@assets/kinglong-04.png';
import kingLong05 from '@assets/kinglong-05.jpg';
import kingLong06 from '@assets/kinglong-06.png';
import kingLong07 from '@assets/kinglong-07.png';
import kingLong08 from '@assets/kinglong-08.png';
import kingLongCoach from '@assets/kinglong-ecoach01.png';
import kingLongVideo from '@assets/kinglong-vid.mp4';
import kingLongBackdrop from '@assets/kinglong-bg_1792052493988.png';
import interior01 from '@assets/interior-01.jpg';
import interior02 from '@assets/interior-02.jpg';
import yutong02 from '@assets/yutong-02.jpg';
import yutong04 from '@assets/yutong-04.webp';
import yutong05 from '@assets/yutong-05.webp';
import yutongBackdrop from '@assets/yutong-bg_1792052493987.png';
import zhongtong01 from '@assets/zhongtong-01.webp';
import zhongtong02 from '@assets/zhongtong-02.webp';
import zhongtongBackdrop from '@assets/zhongtong-bg_1792052493989.png';
import terraNovaPhoto from '@assets/terra-nova_1792052493990.jpg';
import voltcycleBackdrop from '@assets/voltcucle-bg_1792052493989.png';
import voltrideTransparentMark from '@assets/voltride-bg_1792052493990.png';
import approachHeroImage from '@assets/img-01_1792052493992.jpg';
import ecosystemHeroImage from '@assets/e-coach-01_1792052493991.jpg';
import terraBelleLogo from '@assets/terrabelle-bg.png';
import voltriumLogo from '@assets/voltrium-logo-01.1 -bg.png';
import autovanceLogo from '@assets/autovance-bg.png';
import voltcycleHeroImage from '@assets/ev-bat.jpg';
import yutongC13E01 from '@assets/yutong/C13E/01.jpeg';
import yutongC13E02 from '@assets/yutong/C13E/02.jpeg';
import yutongC13E03 from '@assets/yutong/C13E/03.jpeg';
import yutongC13E04 from '@assets/yutong/C13E/04.jpeg';
import yutongC13E05 from '@assets/yutong/C13E/05.jpeg';
import yutongC13E06 from '@assets/yutong/C13E/06.jpg';
import yutongC13E07 from '@assets/yutong/C13E/07.jpg';
import yutongE11PRO01 from '@assets/yutong/E11PRO/011.webp';
import yutongE11PRO02 from '@assets/yutong/E11PRO/02.webp';
import yutongE11PRO03 from '@assets/yutong/E11PRO/03.webp';
import yutongE11PRO04 from '@assets/yutong/E11PRO/04.webp';
import yutongE11PRO05 from '@assets/yutong/E11PRO/05.webp';
import yutongE11PRO06 from '@assets/yutong/E11PRO/06.webp';
import yutongE11PRO07 from '@assets/yutong/E11PRO/07.webp';
import yutongIC12E01 from '@assets/yutong/IC12E/01.webp';
import yutongIC12E02 from '@assets/yutong/IC12E/02.webp';
import yutongIC12E03 from '@assets/yutong/IC12E/03.webp';
import yutongIC12E04 from '@assets/yutong/IC12E/04.webp';
import yutongIC12E05 from '@assets/yutong/IC12E/05.webp';
import yutongT15E01 from '@assets/yutong/T15E/ov-img1.webp';
import yutongT15E02 from '@assets/yutong/T15E/02.webp';
import yutongT15E03 from '@assets/yutong/T15E/03.webp';
import yutongT15E04 from '@assets/yutong/T15E/04.webp';
import yutongT15E05 from '@assets/yutong/T15E/05.webp';

export const partnerMedia = {
  batteryPack,
  chargingHub,
  chargerCabinet,
  kingLong: {
    backdrop: kingLongBackdrop,
    gallery: [kingLongCoach, kingLong04, kingLong05, kingLong06, kingLong07, kingLong08, interior01, interior02],
    video: kingLongVideo,
  },
  yutong: {
    backdrop: yutongBackdrop,
    gallery: [yutong02, yutong04, yutong05],
    models: [
      { id: 'c13e', name: 'C13E', images: [yutongC13E01, yutongC13E02, yutongC13E03, yutongC13E04, yutongC13E05, yutongC13E06, yutongC13E07] },
      { id: 'e11pro', name: 'E11PRO', images: [yutongE11PRO01, yutongE11PRO02, yutongE11PRO03, yutongE11PRO04, yutongE11PRO05, yutongE11PRO06, yutongE11PRO07] },
      { id: 'ic12e', name: 'IC12E', images: [yutongIC12E01, yutongIC12E02, yutongIC12E03, yutongIC12E04, yutongIC12E05] },
      { id: 't15e', name: 'T15E', images: [yutongT15E01, yutongT15E02, yutongT15E03, yutongT15E04, yutongT15E05] },
      { id: 'e12', name: 'E12', images: [], note: 'No image assets were supplied in the current source package; this entry remains a specification reference only.' },
      { id: 'u-series', name: 'U-series', images: [], note: 'No dedicated images were supplied for this coach family in the current source package; this entry is retained as a specification-only reference.' },
    ],
  },
  zhongtong: { backdrop: zhongtongBackdrop, gallery: [zhongtong01, zhongtong02] },
  voltcycleBackdrop,
  terraNovaPhoto,
  voltrideTransparentMark,
  approachHeroImage,
  ecosystemHeroImage,
  terraBelleLogo,
  voltriumLogo,
  autovanceLogo,
  voltcycleHeroImage,
};