import { useContext, useRef } from 'react'
import { ethers } from 'ethers'
import { getSigner, baseMetadata } from '../utils'
import { LENS_HUB_CONTRACT_ADDRESS } from '../api'
import { AppContext } from '../context'
import LENSHUB from '../abi/lenshub'
import { create } from 'ipfs-http-client'
import { v4 as uuid } from 'uuid'
const client = create('https://ipfs.infura.io:5001/api/v0')

export default function CreatePostModal({
  setIsModalOpen
}) {
  const { profile } = useContext(AppContext)
  const inputRef = useRef(null)
  async function uploadToIPFS() {
    const metaData = {
      content: inputRef.current.innerHTML,
      description: inputRef.current.innerHTML,
      name: `Post by @${profile.handle}`,
      external_url: `https://lenster.xyz/u/${profile.handle}`,
      metadata_id: uuid(),
      createdOn: new Date().toISOString(),
      ...baseMetadata
    }
    const added = await client.add(JSON.stringify(metaData))
    const uri = `ipfs://bafybeifrkib5cog4gdccwvz7m2em3tfhgalj3mysqouuma7cq42jmlv76y`
    return uri
  }
  async function savePost() {
    const contentURI = await uploadToIPFS()

    const contract = new ethers.Contract(
      LENS_HUB_CONTRACT_ADDRESS,
      LENSHUB,
      getSigner()
    )
    try {
      const postData = {
        profileId: "0x3f7d",
        contentURI,
        collectModule: '0x23b9467334bEb345aAa6fd1545538F3d54436e96',
        collectModuleInitData: ethers.utils.defaultAbiCoder.encode(['bool'], [true]),
        referenceModule: '0x0000000000000000000000000000000000000000',
        referenceModuleInitData: []
      }
      const tx = await contract.post(postData)
      await tx.wait()
      setIsModalOpen(false)
      
    } catch (err) {
      console.log('error: ', err)
    }
  }