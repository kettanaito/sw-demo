export default function ContactsPage() {
  return (
    <div>
      <h1 className="mb-5 text-3xl font-bold text-center">Contacts</h1>
      <p>
        Reach out to me on{' '}
        <a
          href="https://twitter.com/kettanaito"
          className="underline hover:no-underline"
        >
          Twitter
        </a>{' '}
        or{' '}
        <a
          href="https://bsky.app/profile/kettanaito.com"
          className="underline hover:no-underline"
        >
          Bluesky
        </a>
      </p>
    </div>
  )
}
