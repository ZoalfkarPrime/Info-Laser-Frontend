import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  images: {
    domains: ['img.youtube.com', 'infolaser.ru', 'example.com'],
  }
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
