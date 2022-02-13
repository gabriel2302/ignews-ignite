import { GetStaticProps } from 'next';
import Head from 'next/head';
import Prismic from '@prismicio/client';

import { getPrismicClient } from '../../services/prismic';
import styles from './styles.module.scss';

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="">
            <time>12 de março de 2022</time>
            <strong>Creating a mono repo with Learna & Yarn Workspaces</strong>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus corrupti pariatur quas, odio, numquam voluptate dolore nostrum ipsa tempora adipisci, placeat debitis enim impedit vel possimus excepturi obcaecati culpa quasi?</p>
          </a>
          <a href="">
            <time>12 de março de 2022</time>
            <strong>Creating a mono repo with Learna & Yarn Workspaces</strong>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus corrupti pariatur quas, odio, numquam voluptate dolore nostrum ipsa tempora adipisci, placeat debitis enim impedit vel possimus excepturi obcaecati culpa quasi?</p>
          </a>
          <a href="">
            <time>12 de março de 2022</time>
            <strong>Creating a mono repo with Learna & Yarn Workspaces</strong>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus corrupti pariatur quas, odio, numquam voluptate dolore nostrum ipsa tempora adipisci, placeat debitis enim impedit vel possimus excepturi obcaecati culpa quasi?</p>
          </a>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const primisc = getPrismicClient();

  const response = await primisc.query(
    [Prismic.predicates.at('document.type', 'post')],
    {
      fetch: ['post.title', 'post.content'],
      pageSize: 100,
    }
  )

  const posts = response.results.map(post => {
    return {
      slug: post.uid,
      title: post.data.title

    }
  };
  return {
    props: {

    }
  }
}