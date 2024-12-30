// import images
import LogoImg from '../../assets/img/header/logo.svg';
import HeroImg from '../../assets/img/hero/image.svg';
import OverviewProductImg from '../../assets/img/overview/product.svg';
import FacebookImg from '../../assets/img/overview/brands/facebook.svg';
import GoogleImg from '../../assets/img/overview/brands/google.svg';
import CocaColaImg from '../../assets/img/overview/brands/coca-cola.svg';
import LinkedInImg from '../../assets/img/overview/brands/linkedin.svg';
import SamsungImg from '../../assets/img/overview/brands/samsung.svg';
import Feature1Img from '../../assets/img/features/feature1-img.svg';
import Feature2Img from '../../assets/img/features/feature2-img.svg';
import Feature3Img from '../../assets/img/features/feature3-img.svg';
import ArrowRightImg from '../../assets/img/features/arrow-right.svg';
import CardIconImg1 from '../../assets/img/product/cards/icon1.svg';
import CardIconImg2 from '../../assets/img/product/cards/icon2.svg';
import CardIconImg3 from '../../assets/img/product/cards/icon3.svg';
import PricingIcon1 from '../../assets/img/pricing/icon1.svg';
import PricingIcon2 from '../../assets/img/pricing/icon2.svg';
import PricingIcon3 from '../../assets/img/pricing/icon3.svg';
import AvatarImg1 from '../../assets/img/testimonial/avatar1.png';
import AvatarImg2 from '../../assets/img/testimonial/avatar2.png';
import AvatarImg3 from '../../assets/img/testimonial/avatar3.png';
import AvatarImg4 from '../../assets/img/testimonial/avatar4.png';
import AvatarImg5 from '../../assets/img/testimonial/avatar5.png';
import CtaImg1 from '../../assets/img/cta/image1.svg';
import CtaImg2 from '../../assets/img/cta/image2.svg';
import FacebookIcon from '../../assets/img/copyright/facebook.svg';
import TwitterIcon from '../../assets/img/copyright/twitter.svg';
import LinkedinIcon from '../../assets/img/copyright/linkedin.svg';

export const header = {
  logo: LogoImg,
  btnText: 'Danh mục',
};

export const nav = [
  { name: 'Đăng nhập', href: '/login' },
  { name: 'Đăng ký', href: '/register' },
  { name: 'Bảng giá', href: '/' },
  { name: 'Liên hệ', href: '/' },
];

export const hero = {
  title: 'Study with me',
  subtitle: 'Kết nối tri thức, chinh phục tương lai ',
  btnText: 'Dùng thử  miễn phí ',
  compText: '— Web, iOS và Android',
  image: HeroImg,
};

export const overview = {
  productImg: OverviewProductImg,
  brands: [
    {
      image: FacebookImg,
      delay: 300,
    },
    {
      image: GoogleImg,
      delay: 400,
    },

    {
      image: LinkedInImg,
      delay: 600,
    },
    {
      image: SamsungImg,
      delay: 700,
    },
  ],
};

export const features = {
  feature1: {
    pretitle: 'Luôn trực tuyến',
    title: 'Hỗ trợ thời gian tức thì',
    subtitle:'Cung cấp nền tảng học tập linh hoạt, tương tác và cá nhân hóa, giúp sinh viên tiếp cận kiến thức một cách hiệu quả và sáng tạo.',
    btnLink: 'Tìm hiểu thêm',
    btnIcon: ArrowRightImg,
    image: Feature1Img,
  },
  feature2: {
    pretitle: 'Miễn phí một số chi phí',
    title: 'Tiết kiệm chi phí cho bạn và gia đình',
    subtitle:
      'Chi phí khóa học hợp lý, tạo điều kiện cho sinh viên tiếp cận các chương trình học chất lượng mà không gặp nhiều rào cản tài chính.',
    btnLink: 'Tìm hiểu thêm',
    btnIcon: ArrowRightImg,
    image: Feature2Img,
  },
  feature3: {
    pretitle: 'Mọi lúc mọi nơi',
    title: 'Học tập mọi lúc mọi nơi',
    subtitle:
      'Hệ thống đào tạo thông minh cho phép sinh viên học mọi lúc, mọi nơi, tận dụng thời gian rảnh rỗi để tiếp cận kiến thức và phát triển kỹ năng một cách linh hoạt và hiệu quả.',
    btnLink: 'Tìm hiểu thêm',
    btnIcon: ArrowRightImg,
    image: Feature3Img,
  },
};

export const product = {
  title: 'Sản phẩm chúng tôi làm việc với.',
  subtitle:
    'Hệ thống đào tạo thông minh, tích hợp công nghệ học trực tuyến, quản lý khóa học, và các công cụ tương tác, giúp sinh viên và giảng viên kết nối, chia sẻ kiến thức và nâng cao trải nghiệm học tập.',
  cards: [
    {
      icon: CardIconImg1,
      title: 'Tài liệu học tập',
      subtitle: 'thiết kế đa dạng và phong phú để đáp ứng nhu cầu học tập của sinh viên',
      delay: 200,
    },
    {
      icon: CardIconImg2,
      title: 'Cá nhân hóa lộ trình',
      subtitle: ' định hình chương trình học phù hợp nâng cao hiệu quả học tập.',
      delay: 400,
    },
    {
      icon: CardIconImg3,
      title: 'Tiến độ học tập',
      subtitle: 'báo cáo chi tiết và gợi ý điều chỉnh lộ trình đảm bảo sinh viên luôn đi đúng hướng, đạt được mục tiêu học tập.',
      delay: 600,
    },
  ],
};

export const pricing = {
  title: 'Chọn gói cho riêng bạn.',
  cards: [
    {
      icon: PricingIcon1,
      title: 'Gói cơ bản',
      services: [
        { name: 'Giá thấp hoặc miễn phí' },
        { name: 'Tính năng giới hạn' },
      ],
      price: '7.000.000',
      userAmount: 'tối đa 2 người dùng',
      btnText: 'Đăng kí',
      delay: 300,
    },
    {
      icon: PricingIcon2,
      title: 'Gói Tiêu Chuẩn',
      services: [
        { name: 'Giá trung bình' },
        { name: 'Cung cấp nhiều tính năng ' },
      ],
      price: '10.000.000',
      userAmount: 'tối đa 2 người dùng ',
      btnText: 'Đăng kí',
      delay: 600,
    },
    {
      icon: PricingIcon3,
      title: 'Gói cao cấp',
      services: [
        { name: 'Giá caocao' },
        { name: 'Đầy đủ tính năng' },
      ],
      price: '15.000.000',
      userAmount: 'tối đa 2 người dùng',
      btnText: 'Đăng kí',
      delay: 900,
    },
  ],
};

export const testimonials = {
  title: 'Chúng tôi có triệu lời chúc tốt đẹp nhất',
  clients: [
    {
      message:'Chuyên gia Khoa học máy tính và AI với hơn 10 năm kinh nghiệm giảng dạy.Phong cách dạy thực tiễn, khuyến khích sáng tạo qua các dự án thực tế.',
      image: AvatarImg1,
      name: 'Nguyễn Đức Minh',
      position: 'CEO',
      borderColor: '#FF7235',
    },
    {
      message:'Chuyên gia Quản trị kinh doanh và Big Data, từng cố vấn tại các tổ chức quốc tế. Dạy học gắn kết lý thuyết với thực tiễn kinh doanh.',
      image: AvatarImg2,
      name: 'Phùng Bảo Lâm',
      position: 'CEO',
      borderColor: '#FFBE21',
    },
    {
      message:'Nhà thiết kế sáng tạo với hơn 8 năm kinh nghiệm trong ngành đồ họa. Giảng dạy truyền cảm hứng và khuyến khích sinh viên thể hiện cá tính.',
      image: AvatarImg3,
      name: 'Nguyễn Thị Kiều Trang',
      position: 'CEO',
      borderColor: '#4756DF',
    },
    {
      message:'Chuyên gia về phần mềm và ứng dụng di động, đạt nhiều giải thưởng nghiên cứu. Giúp sinh viên rèn tư duy logic và kỹ năng giải quyết vấn đề.',
      image: AvatarImg4,
      name: 'Đăng Anh Tuấn',
      position: 'CEO',
      borderColor: '#3EC1F3',
    },
    {
      message:'Diễn giả chuyên nghiệp về kỹ năng mềm với 5 năm kinh nghiệm. Phong cách giảng dạy tương tác, phát triển kỹ năng toàn diện cho sinh viên.',
      image: AvatarImg5,
      name: 'Trịnh Thanh Đoan',
      position: 'CEO',
      borderColor: '#BB7259',
    },
  ],
};

export const cta = {
  title: 'Hơn 1 triệu người tham gia từ 10 quốc gia',
  subtitle: 'Đăng kí học thử đầy đủ tính năng trong 7 ngày',
  btnText: 'Đăng kí',
  img1: CtaImg1,
  img2: CtaImg2,
};

export const footer = {
  logo: LogoImg,
  links: [
    { name: 'Trang chủ', href: '/' },
    { name: 'Về chúng tôi', href: '/' },
    { name: 'Gia cả', href: '/' },
    { name: 'Tính năng', href: '/' },
    { name: 'Blog', href: '/' },
  ],
  legal: [
    { name: 'Điều khoản sử dụng', href: '/' },
    { name: 'Điều khoản và điều kiện', href: '/' },
    { name: 'Chính sách bảo mật', href: '/' },
    { name: 'Chính sách cookie', href: '/' },
  ],
  newsletter: {
    title: 'Bản tin',
    subtitle: 'Hơn 25000 người đã đăng ký',
  },
  form: {
    placeholder: 'Nhập email',
    btnText: 'Đăng kí',
    smallText: 'Chúng tôi không bán email và thư rác của bạn',
  },
};

export const copyright = {
  link1: {
    name: '',
    href: '/',
  },
  link2: {
    name: ' ',
    href: '/',
  },
  copyText: '2024 education',
  social: [
    { icon: FacebookIcon, href: '/' },
    { icon: TwitterIcon, href: '/' },
    { icon: LinkedinIcon, href: '/' },
  ],
};
