import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Post from './models/Post';
import Comment from './models/Comment';

const dropCollection = async (
  db: mongoose.Connection,
  collectionName: string,
) => {
  try {
    await db.dropCollection(collectionName);
  } catch (e) {
    console.log(`Collection ${collectionName} was missing, skipping drop...`);
  }
};

const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  const collections = ['users', 'posts', 'comments'];

  for (const collectionName of collections) {
    await dropCollection(db, collectionName);
  }
  const [user1, user2, user3, user4] = await User.create(
    {
      username: 'patrixxxx',
      password: '123ct',
      token: crypto.randomUUID(),
    },
    {
      username: 'khawrezm',
      password: '123wd',
      token: crypto.randomUUID(),
    },
    {
      username: 'Dirtyeippih ',
      password: '123aq',
      token: crypto.randomUUID(),
    },
    {
      username: 'surface_ripened',
      password: '123sx',
      token: crypto.randomUUID(),
    },
  );

  const [post1, post2, post3] = await Post.create(
    {
      user: user1,
      title: 'New photos of the $80 million Mars Ingenuity helicopter',
      description:
        'New photos of the $80 million Mars Ingenuity helicopter, showing a blade completely broken off and lodged into a martian sand dune',
      image: 'fixtures/ingenuity-helicopter.webp',
      datetime: new Date().toISOString(),
    },
    {
      user: user2,
      title: 'Central Asia was a very good place before barbarians ruined it',
      description:
        'Did you know that the first ever type of state sponsored schools were designed and built in central Asia by a central asian? Nizam ul mulk an Iranian vizier during Seljuk empire designed something called the madresah which was a place to learn science language İslam and poetry for kids. ',
      image: 'fixtures/CA.webp',
      datetime: new Date().toISOString(),
    },
    {
      user: user3,
      title:
        'Graphic Design\n' +
        'A collaborative learning community for graphic designers at any stage',
      description:
        "I walk past this billboard near my flat, pretty much everyday. For my small a** town, it's nice to see this slim bezel digital billboard (especially with trees behind, I'll be sharing more pics) When the ad is good or done well, I stop and look for minutes at a time 🤩 ",
      datetime: new Date().toISOString(),
    },
    {
      user: user4,
      title:
        'MacGPT vs MacBot - which is your go to app when using the ChatGPT plus subscription? ',
      description:
        ' MacGPT vs MacBot - which is your go to app when using the ChatGPT plus subscription? ',
      datetime: new Date().toISOString(),
    },
  );

  await Comment.create(
    {
      user: user3,
      post: post1,
      text: 'It was planned for 5 flights and it achieved how many? It might have cost a few bucks but that seems like a great deal to me',
    },
    {
      user: user4,
      post: post1,
      text: "Money better spent than all the useless weapons we've made to kill each other.",
    },
    {
      user: user3,
      post: post3,
      text: 'There is evidence of state-sponsored schooling in China more than a thousand years before Niẓām al-Mulk was even born. Some in the Byzantine Empire too. His achivement was remarkable, but he was not the first.',
    },
    {
      user: user4,
      post: post2,
      text: 'The very definition of a high-effort post. ',
    },
    {
      user: user3,
      post: post2,
      text: ' Tried both, MacBot and MacGPT web both seem solid for using chatgpt plus. However, I found web mode itself somewhat more refined on MacBot. ',
    },
    {
      user: user3,
      post: post2,
      text: 'You really do love asking the same question but with just slightly different words dont you? ',
    },
  );
  await db.close();
};

void run();
