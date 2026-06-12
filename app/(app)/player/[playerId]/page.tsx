

async function Page({params}: any) {
    const { playerId } = await params

    return (
        <div>Player {playerId}</div>
    )
}

export default Page