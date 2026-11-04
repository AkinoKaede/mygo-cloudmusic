import { createFileRoute } from '@tanstack/solid-router'
import { For, Show, createSignal, type JSX } from 'solid-js'
import { Layout } from '../components/Layout'
import { GitHubMark, Icon, type IconName } from '../components/Icon'
import { ThemeSwitch } from '../theme'
import { site } from '../site'

const title = `${site.name} — 原生地，安静地下线。`
const description = '网易云音乐来函，请本站立即下线。启动快，下线更快。'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title },
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
    ],
  }),
  component: Home,
})

function Home() {
  return (
    <Layout>
      <Hero />
      <Ranking />
      <Spotify />
      <Features />
    </Layout>
  )
}

function Hero() {
  return (
    <section class="hero">
      <div class="grooves" aria-hidden="true" />
      <div class="hero-text">
        <p class="eyebrow">
          <span class="pill">已下线</span>第三方网易云音乐桌面客户端
        </p>
        <h1 class="display hero-title">
          <span>原生地，</span>
          <span>安静地下线。</span>
        </h1>
        <p class="lede">
          网易云音乐来函，请本站「立即下线」。用 Go 与 MyGo 写成的好处就在这里：启动快，下线更快。它只是用你自己的账号，放你自己买了会员的歌。现在不放了，不打扰你的电脑，也不打扰贵司。
        </p>
        <div class="actions">
          <a class="btn btn-primary" href="https://music.163.com/#/download">
            <Icon name="download" size={17} />
            下载官方客户端
          </a>
        </div>
        <p class="fine">官方客户端基于 Chromium · 装好有 354 MB · 打开就用 700 MB 内存 · 但它有授权</p>
      </div>
      <div class="hero-window">
        <Takedown />
      </div>
    </section>
  )
}

// The one song left, greyed out as NetEase's own lists grey out theirs, and
// answering the play button as they do.
function Takedown() {
  const [tried, setTried] = createSignal(0)
  return (
    <div class="gone">
      <div class="gone-row">
        <div class="gone-record" aria-hidden="true">
          <div class="vinyl" />
        </div>
        <div class="gone-song">
          <b>原生地，安静地听歌</b>
          <span>MyGo 云音乐</span>
        </div>
        <button type="button" class="ctl play" aria-label="播放" onClick={() => setTried((n) => n + 1)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5z" />
          </svg>
        </button>
      </div>
      <p class="hint" role="status">
        <Show when={tried() > 0} fallback="试试点一下播放。">
          因合作方要求，该资源暂时下架
        </Show>
      </p>
    </div>
  )
}

// Stars as of `rankedOn`, of the third-party NetEase clients that come up
// first on GitHub. Their names stay blacked out: the point is the numbers,
// not to hand anybody a list.
const rankedOn = '2026年11月4日'
const rivals = [
  { kind: '桌面客户端', stars: 33534, width: '9em' },
  { kind: '桌面客户端', stars: 17210, width: '7.5em' },
  { kind: '命令行客户端', stars: 9870, width: '5em' },
  { kind: '命令行客户端', stars: 2630, width: '6.5em' },
  { kind: '桌面客户端', stars: 1649, width: '7em' },
]
const ourStars = 684
const mostStars = Math.max(...rivals.map((r) => r.stars))
const search = 'https://github.com/search?q=%E7%BD%91%E6%98%93%E4%BA%91&type=repositories&s=stars&o=desc'

function Ranking() {
  return (
    <section id="ranking" class="section">
      <div class="section-head">
        <p class="eyebrow">其他第三方</p>
        <h2 class="display">
          <span>任何第三方，</span>
          <span>一视同仁。</span>
        </h2>
        <p class="lede">
          来函写道：「任何第三方均没有权利播放由我司享有版权的音乐作品」。一视同仁，我们很欣赏。于是去 GitHub
          看了看，其他第三方都过得怎么样。
        </p>
      </div>
      <ol class="ranking">
        <For each={rivals}>
          {(r) => (
            <Rank status="还在" stars={r.stars} kind={r.kind}>
              <span class="redacted" style={{ width: r.width }} role="img" aria-label="名字已涂掉" />
            </Rank>
          )}
        </For>
        <Rank status="收到来函" stars={ourStars} kind="桌面客户端" ours>
          <b>{site.name}</b>
        </Rank>
      </ol>
      <div class="ranking-foot">
        <a class="btn btn-ghost" href={search}>
          <GitHubMark size={17} />
          在 GitHub 上搜「网易云」
        </a>
        <p class="ranking-note">
          名字是我们涂的，想知道大约需要三秒。「还在」只是说页面还打得开，他们收没收到信，我们不知道。星标数取自{rankedOn}。
        </p>
      </div>
    </section>
  )
}

// Spotify's third-party clients as of `rankedOn`: only those whose READMEs
// ask for Premium, as the sentence over them says. Their bars are on the same
// scale as the ranking's.
const spotifyClients = [
  { name: 'spotify-tui', repo: 'Rigellute/spotify-tui', kind: '终端客户端', stars: 19407 },
  { name: 'Spotifyd', repo: 'Spotifyd/spotifyd', kind: '后台播放服务', stars: 10820 },
  { name: 'Psst', repo: 'jpochyla/psst', kind: '原生桌面客户端', stars: 9502 },
  { name: 'librespot', repo: 'librespot-org/librespot', kind: '客户端库', stars: 7365 },
  { name: 'spotify-player', repo: 'aome510/spotify-player', kind: '终端客户端', stars: 7299 },
  { name: 'ncspot', repo: 'hrkfdn/ncspot', kind: '终端客户端', stars: 6806 },
]

function Spotify() {
  return (
    <section id="spotify" class="section">
      <div class="section-head">
        <p class="eyebrow">隔壁</p>
        <h2 class="display">
          <span>Spotify 那边，</span>
          <span>也有第三方。</span>
        </h2>
        <p class="lede">
          下面这些都写明了需要 Spotify Premium：用你自己的账号，放你自己买了会员的歌。这要是在网易云，已经可以收信了。Spotify 大概还没来得及采购法务。
        </p>
      </div>
      <ol class="ranking">
        <For each={spotifyClients}>
          {(c) => (
            <Rank status="还在" stars={c.stars} kind={c.kind}>
              <a class="rank-link" href={`https://github.com/${c.repo}`}>
                {c.name}
              </a>
            </Rank>
          )}
        </For>
      </ol>
      <div class="ranking-foot">
        <a class="btn btn-ghost" href="https://developer.spotify.com">
          Spotify 给开发者的网站
          <Icon name="arrow" size={16} />
        </a>
        <p class="ranking-note">
          这回名字不涂了，它们不归贵司管。「还在」的意思同上。星标数取自{rankedOn}。
        </p>
      </div>
    </section>
  )
}

function Rank(props: { stars: number; kind: string; status: string; ours?: boolean; children: JSX.Element }) {
  return (
    <li class="rank" classList={{ ours: props.ours }}>
      <div class="rank-name">
        {props.children}
        <span>{props.kind}</span>
      </div>
      <div class="rank-bar" aria-hidden="true">
        <i style={{ width: `${(props.stars / mostStars) * 100}%` }} />
      </div>
      <span class="rank-stars">{props.stars.toLocaleString('en-US')} ★</span>
      <span class="rank-status">{props.status}</span>
    </li>
  )
}

type Feature = { icon: IconName; title: string; body: string; wide?: boolean; extra?: () => JSX.Element }

const features: Feature[] = [
  {
    icon: 'wave',
    title: '五种音质的安静',
    body: '标准、较高、极高、无损（FLAC）与 Hi-Res，按你的耳朵和网速选。每一档都一样安静。',
    wide: true,
    extra: () => <Quality />,
  },
  {
    icon: 'disk',
    title: '听过的，存在记忆里',
    body: '再次播放，需要一点想象力。',
  },
  {
    icon: 'history',
    title: '从上次停下的地方',
    body: '就停在那儿了。',
  },
  {
    icon: 'volume',
    title: '温柔的音量',
    body: '音量均衡，暂停时淡出。淡入的部分已下架。',
    extra: () => <Fade />,
  },
  {
    icon: 'radio',
    title: '私人 FM 与心动模式',
    body: '推荐、熟悉、探索三种口味都关了。心动模式还在：收到来函那一刻，自动开启。',
  },
  {
    icon: 'calendar',
    title: '每日推荐',
    body: '每天 6:00 不再更新。今日推荐：官方客户端。',
  },
  {
    icon: 'qr',
    title: '扫码登录',
    body: '请用网易云音乐 App，登录网易云音乐 App。',
  },
  {
    icon: 'notch',
    title: '刘海播放器',
    body: '屏幕顶部的刘海，恢复了它本来的功能：挡住一块屏幕。',
  },
  {
    icon: 'lyrics',
    title: '逐字歌词与「律动」',
    body: '来函我们逐字读过了。在「律动」视图里，每个字浮起、发光，最后落定在《刑法》两个字上。',
    wide: true,
  },
  {
    icon: 'sun',
    title: '浅色、深色、跟随系统',
    body: '本站仅存的功能，请珍惜。',
    extra: () => <ThemeSwitch labels class="feature-theme" />,
  },
]

function Features() {
  return (
    <section id="features" class="section">
      <div class="section-head">
        <p class="eyebrow">功能</p>
        <h2 class="display">
          <span>该有的，</span>
          <span>都没了。</span>
        </h2>
        <p class="lede">从发现到播放，每一处都为下线重新做过。喜欢、播放队列、随机与循环，一样不剩。</p>
      </div>
      <div class="features">
        <For each={features}>
          {(f) => (
            <article class="feature" classList={{ wide: f.wide }}>
              <div class="feature-icon">
                <Icon name={f.icon} size={20} />
              </div>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
              {f.extra?.()}
            </article>
          )}
        </For>
      </div>
      <p class="thanks">谢谢这 {ourStars} 颗星，也谢谢听过的每一个人。</p>
    </section>
  )
}

const qualities = [
  { name: '标准', spec: '0 kbps · 静音' },
  { name: '较高', spec: '0 kbps · 较高的静音' },
  { name: '极高', spec: '0 kbps · 极高的静音' },
  { name: '无损', spec: '0 kHz / 0 bit · 无损的静音' },
  { name: 'Hi-Res', spec: '0 kHz / 0 bit · 母带级的静音' },
]

// The settings' choice of quality, as the app shows it.
function Quality() {
  const [q, setQ] = createSignal(3)
  return (
    <div class="quality">
      <div class="segmented" role="radiogroup" aria-label="音质">
        <For each={qualities}>
          {(item, i) => (
            <button
              type="button"
              role="radio"
              aria-checked={q() === i()}
              classList={{ on: q() === i() }}
              onClick={() => setQ(i())}
            >
              <span>{item.name}</span>
            </button>
          )}
        </For>
      </div>
      <p class="quality-spec">{qualities[q()].spec}</p>
    </div>
  )
}

// A wave fading out at a pause, and not coming back.
function Fade() {
  const bars = Array.from({ length: 44 }, (_, i) => {
    const env = i < 16 ? 1 : i < 22 ? 1 - (i - 16) / 6 : 0
    return Math.max(0.06, env * (0.45 + 0.55 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.6))))
  })
  return (
    <div class="fade" aria-hidden="true">
      <For each={bars}>{(h) => <i style={{ height: `${h * 100}%` }} />}</For>
      <span class="fade-mark">下线</span>
    </div>
  )
}
