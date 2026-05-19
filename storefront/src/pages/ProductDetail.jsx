import { useState, useRef, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function ProductDetail() {
  const navigate = useNavigate()
  const { addToCart } = useCart()

  // Dynamic gallery items
  const galleryImages = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCHFDhdExrS5zDK9zZ0iv8bQ8LaXiJNM8sno1bI-KEUJBpZAnQrIAeXgVrf3gX9Ebr5Z9mHn3nXanJnwktzzXEj_VOn3bftbRZL6t7Iv5oDAKygiClGgFBGL145y-8DXvl3-dZ4yTjdNAeLI_CkKWqlh1sNligDKyzVF74ASSXc-ZlxRQQAK8085IVdLSVzfZvpXnJxiPzV38zxrT51dtiMWtdjDvZ_AK1SHbx_EvJNJf2KnHSUiFCKShxd6pBxvfbsC_D0kQnvN6xB',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBhLpG880WnRLAbbCXJCl6YoOGN7HMiV2KIKoImpmihjaqt5-javT9QfgMmd5H6Z5YOHXtCew5gvUq2RhQpxUdZRZTY7rbA04lpkBUkBh9mXEc6DCkFSMzqzTayLrTOl6oeq5NkO6lbyl30tGMjfQzOVkXBpSGCzPwzq-rTOVD_fs1_qz6setzemStierC3OlgSFBc-ykDGZz3VKX2vOjYcq9aiImCct2T0uIbSmOCKhfphxErObePsvFMlBu0aFVF5Q3LOoVEgV9LB',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBLWi2S1K2ZcDoSbjddwpNnDLKPlKtgo3ci0A6c8YocTd9hrq-yBbq9UI4iLV0ykUtijuUZQdIznPL_Jy3HhJhHWg_witXOCTTDS6wzFIubitGvDQmyTkOtHbbNIqAJIWtQl2mc1XYK36aX380SYkThndJ9P8vH42KWJ1hu-0N_AfobFFHy3E6jJLWRNR6Hz5AVVqEyUy9dTPsElqljSiUKCYxWWXE-hHV_f9lUnzu91krsKzklICyUlB63BYRybr2SUNVfOzVuIb-V',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCYg75Wd1HojwIw4KUhFBwjhq83FNyXYxUNNqvzDwXjvI3u7cx4nzicRzTY8duDSrhvxYpilIWYFTrrc0Hm3VA3iZDcMcQtNabNgpU57kQYjAHQ5jVbVJVlELH5ZyYw-lcnW2NOd3EwGTLk4zU9nTgg7Q335tNUNL-7IkbVUwaj9urlkldt8RtdB8dc9gnw3rms4QW2hRIZYISgcGKgnmmnmhljab2xieT4bU-ZoovS95DqyP8K6cxba-jTjz_aa6jTfjBAQ3CLXUC2',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAXrzgwSPSRTnulpTqFXBQOUJdlnsRx4sS95u0U4trLrT0CjXbp8uLj9qK76SvSHAwiCtunnWQqKsBMYp5QWJenM0Za3ezZTBM7PNQO17tR0OCJdf7meCvCs7sHyClYGiCuiBJuL-ZzG0slmKd6f7PXOdznO8dhtvT7BoCUczypYfh8mq2x3aJhbbRAe8aRLck-v91Tac-I6pewXg_tdqFjNl-ibXu410W-YK2syZMQH-yPDndKMpvEWk8zz8HmPFfVGTP90XOoyGAC',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBS7iN4cI2LM2MRNfNPsELNWnpxvgBFbd4I8P3bXtNwj-DqzP1j1BjLMF2sQmcSBVytI7PhX_up4n09JRs_3JSSB3PIZgJe9rDcN6QCCWeNJYsyOiu8L8BHS3KSu-xigH39BiqQ4b6-y81XA518Z2BB7tHGvapNy1IRKtXtDyxPGHZMWXgBXh4JkwVEGycSWfHRp2v0nGU2KtEKGRGwU_e7kqfAnpwEZ09a9QwHpjMhmBObQ1lfKXiDNNT60Ae8x5W3CZ2SH0eJGnYL',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC1_wuyDCapxZvH_Td7iOtj0RqJb6wfWC88fbdPMlwNRi-sSxKJYzzLwFgYyrOKN6FIIerFYxntWxJXszXAEeTdK_IpHdh8aHMbQhaYRD14uXnTEhEDee6pXbuTfZnKCgulqCHrv4iTqz9TE_-7bvzcPc6y0KbhWLms0Q_HDGMa3VdaJ6XEoa3WJ3CqZD4vnKs4zk4KXoDNAU7awgsZzsqtZSyBKe3M-u_CUiKlUf9R04SgtmLKaMQp1PqzGPDs6J_Zg0yQ8Lu52qoj',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCV-4eQ0XAtCJMgpQNhM7_SM0CYkXVrd33BsswWnoIvh8gWLLQe9AcD2GhsY7HdsoZfqpzbFnwdwFbj438u5U1I8m7Tg8Nf20CNWrvYIthQCpwJg-7lymgmjps5TAgNUS1AASMgmibIl4v4FtM1ckOMq5xQckHdg8v7mR-zBQBWtV8PWMhAnywQvlPLZi6M6PZ696F-x6gt0-l2VRqfmQRzSnRHsUKnSJtmBrrNRlxh8Qs1JuGTVurB9u46nTTsw6O2lbLjcNfr0MU4',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB-Ov1xAd2NdOieN2GOeLV0TF6JsaQQDSWPEa_lshV5IzxopP7L0-hApwIH0sR-5KEfq7uWKTSjO0xKcvtChuYVzvFtOUh-SHY4D4e5gnRYjHxNMysezhC41fNooOz5aclGyGBHSILhrK_J5dYnIBXTNnJSEHUcNM4dlURNZbov0YoZpvdyRHEwXnnDv8a_tuEFAugdzR-aIs6CWdaZjyE-qVOUU7ejFwVf9CK9KHxtg3sbOfg1-SqOaUhMuKVc8uiMZV3WBV7f86Cv',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBCrx8p5Kh1-gF_c_zoXgG49zG8cm_cTz9q5zzA6_RMlxGY-306iC1dmMW1ForGTBlEMxdCnqNbfRpSkPYKsUSCvhH3tB996HaUzB-DGV5uZ0tDW1uDJXL0-cBugS5gcJQ8zseSD6HfGp-iSOwYpOOuPLcFncpC7TGJmOeYKjDqYOD6QgSaMohi4ChbVHZhYjDgDQ_TAn7GnmrOfdQhHRLE1VW11RrDVSWXmLLX7GdNq8KfQts4dSROG7rkhCBY21CkyvTU7acoxoov',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD7IvBanf41ZF6HNZMW3TtPWScH9TX7jD-Rmw1C97r4FPoMNC0vQAZAyo46B2HBfj2EBjc9WmvJOCJtnrEeTciK90J4x2dZfk00jHq1m9U2kcPp3b_Vr2FFlw5Vx-O8wmTHEfzDd5DufpVXaAwbVXqChwkAMjMxO5H3Xia6YD8Fj2-bLfnZQA-sY-nnkMSK2g8RuOJ-_KXAEyRO8bkYY_p6qE3Lolhm7Xk4oWrJhhXgnHqKxAgWRszibCPhJ4AnUttBKDWJLTp-QBUz',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDC7cMXLqYmNxrcG20kLnN6DcbGL3QksrfyQ66XYUrWEjfhTlafkeW5x5M3plvzspAzzakW6TTOd8LuLzprczb0kkIMRYzLeQnTmisllxstlemPrBllvRyiHEOlXRs1hpOhDhs0SK9vrHhH9SskOiYhI7EX8s8puKRVSVZgNTp3njO3b9WFJ1aDeIiysvG03FHtonJLvW45MZAf8WgaPXWu5mmNpplunAC05j-ONOl0aqpKt57ma-gNVLWUKJiaWUEYcP9XcgdUpfSJ',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCo-NE4FtF2FyqXlTtTLTghkmpQAQrCsbLUsQH2cSFvHUvaRmB3MsQUkfdzJOa2pKfKNxrddIHxqu52C5b29b8DSYbrdNnpCDcY5eUmpg8kdNC0PdVsFbQbkpKXk4EAuNtpARbc5V_bALkEoZa03UGFnPWgLDN2cjVIrmrSG97itTHDRnxnMJFErbj8S9aWvW9fnqMtlAXvi6GeYdbFiZF9UOIOUOrKKK3WtCe68QG1yEIePldEnWYnGZ_5zlxLrcAPd3LOTsN6OYhq',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB7xz9rdNWgFpZG_hdg5vHiBJlHL5KD3r8qavMoZEZz17ZVl9xaIfLnYfDo4X8H8yEXG402kmjrQXyn-DnBQ32zFHF6HT-XJ4qYOoKIXfNwE7kf2pft3JI7PAabftOl6AUURs2VKWYC7B28esLGjVmHvYK3qpFHl4hzwcNxwPpV2RlXCblxW8VU7qeCME3KkX6Fw6ODBjJxGuZ9cG0iMnUHN8FdNv5OpD4Yckru-fe6Oqc0Y2nR8TF4vmw-Vga50-xLFTKeTGa9sTLQ',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCvxfoUm12HrDwCt-95bR1Lj1Je_09r4glWFj62v5JHtobndYL42aQCyOevxfl0asTeaSlN0ZG2MrdTwbN3mZHAEQC_e6sH9a9qUruNKvmcR5u9ncDlAtra7YHfwFrtZe3I0bUWDW9den2lcCT01p1IND3_eBH3Yx2bpi3LC-aJcqCnaKAiWb0LLp0nOYp4qlxPdi3SmKUMie-Osb4M0bLWtjL7L5hK4BQuym9-zkiuMvM1oQqre9A6m9_4VcEwmsMxgbSaI8ARmw-2'
  ]

  const desktopScrollRef = useRef(null)
  const mobileScrollRef = useRef(null)
  const [desktopHiddenCount, setDesktopHiddenCount] = useState(0)
  const [mobileHiddenCount, setMobileHiddenCount] = useState(0)
  const [activeImage, setActiveImage] = useState(galleryImages[0])
  const [selectedColor, setSelectedColor] = useState('Obsidian')
  const [selectedSize, setSelectedSize] = useState('9')
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const [addedNotice, setAddedNotice] = useState(false)
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [viewerActiveImage, setViewerActiveImage] = useState(galleryImages[0])

  const handleViewerPrev = (e) => {
    e.stopPropagation()
    const currentIndex = galleryImages.indexOf(viewerActiveImage)
    const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length
    setViewerActiveImage(galleryImages[prevIndex])
  }

  const handleViewerNext = (e) => {
    e.stopPropagation()
    const currentIndex = galleryImages.indexOf(viewerActiveImage)
    const nextIndex = (currentIndex + 1) % galleryImages.length
    setViewerActiveImage(galleryImages[nextIndex])
  }

  const closeViewer = () => {
    setActiveImage(viewerActiveImage)
    setIsViewerOpen(false)
  }

  // Standard main shoe reference
  const baseShoe = {
    id: 'aeromax-elite',
    name: 'AeroMax Elite',
    price: 240.00,
    category: 'Running',
    imgSrc: activeImage
  }

  // Cross-selling accessories list
  const accessoryProducts = [
    { id: 'acc-1', name: 'Elite Compression Sock', category: 'Apparel', price: '$24.00', imgSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDw2STjkUyJuO7VW5_UI8Wj78nS5Ow0dYHZRv45GDukN4YNaoJSSbpRH-8HbwD2juibbdkaH1_lg701q94cP9DVpHDOrCn4Esno75hYkS01-b8_45pC7k2UaLuMJ4-zST4HNcgeabKvjXm16pgZ6WP9SSbxkAv3hhbHzNKPTPra2x5atyMRK93dEwI7RBw7_dQgBml4yDuZ3WOBb8vcejjF784kiaSsaeb0wRDxjKDGw6GnwuasLlC87uVnYmF310dvuVIh43v4mL5l' },
    { id: 'acc-2', name: 'Aero Split Short 5"', category: 'Apparel', price: '$68.00', imgSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA982VN6qtUhIqgOD3-5UbNFT16VSH4WmICcRBiaKGw5uIdh-c0jFfMjPhiJru-JN8PAe9Y9GAm8c29LgojxLuwiWvNCXHz9VFUAPSmdOKMD3BE351l3QR9pk1IhdhX7GhP4VfprIrl8csD6WWtTPEqL12yyYWA0BmEy0uLJwXTlucYTMarYAficeqGEBaye7GrfLoIKcSGMOiwvJEuyjqYM_1fkU6NWaonWXs-kmpmmSRL3rzOyxCeCacgd_3WEC-xS2Iwry5PWUDe' },
    { id: 'acc-3', name: 'Velocity Run Cap', category: 'Accessories', price: '$35.00', imgSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5zQeYd8DF97L88NCspVLAdTTQs868bGvbRmg5CbruiLBhm_dkraJ8IOiGeL0Rk-z7KMC5gXbXOyFrXEFXFpXCGyEya4i1T1uD_RZK4QNNCJXfbcNwYWwnXW50D4Z1KzueiDmn11FYI9B_7l7rjh_7XGc6o2qdviO-7CzRdid_W5l33NLNsQIUdvEJ5Fic5LeA2PrfKRmkr9EAL_oXl1J82faEfnO5kPfLMBGt_0eJaw2_maPPiUdN_G3Z8qGvBYB_5WuOLlvBygVJ' },
    { id: 'acc-4', name: 'Stratus Singlet', category: 'Apparel', price: '$55.00', imgSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARNDk4IeIH_bgbqH92yWS6shi7g6ncIsy60HZAfnPjn1uR4zWczzviP6CjqoYLRWINcX21zg6oJFKHaeodWVuFUliWNMbF2-pUzDvb2onlRV2RHY25UWildBbn5j1lugF4HdJnLn2Lg-nxcTYcJzYAv56ojp-q_VWGDaz913Ip7EfEesGcP8247lqIgoEw1XM2OJBxQgBYE1XDlKZDw2Y5BdlRKLG9d-mp1aaCJeL_dbrthHPMnbavj8mRU3LN54o-XW2Bhyz-HyAE' }
  ]

  useEffect(() => {
    const calcDesktop = () => {
      const el = desktopScrollRef.current
      if (!el) return
      const thumbSize = 96 + 12 // w-24 h-24 + gap-3
      const visibleCount = Math.floor(el.clientHeight / thumbSize)
      const firstVisible = Math.floor(el.scrollTop / thumbSize)
      const lastVisibleIndex = firstVisible + visibleCount - 1
      const remaining = galleryImages.length - (lastVisibleIndex + 2)
      setDesktopHiddenCount(Math.max(0, remaining))
    }

    const calcMobile = () => {
      const el = mobileScrollRef.current
      if (!el) return
      const thumbSize = 80 + 12 // w-20 h-20 + gap-3
      const visibleCount = Math.floor(el.clientWidth / thumbSize)
      const firstVisible = Math.floor(el.scrollLeft / thumbSize)
      const lastVisibleIndex = firstVisible + visibleCount - 1
      const remaining = galleryImages.length - (lastVisibleIndex + 2)
      setMobileHiddenCount(Math.max(0, remaining))
    }

    // Small delay to let DOM settle before initial calc
    const timer = setTimeout(() => {
      calcDesktop()
      calcMobile()
    }, 100)

    const dEl = desktopScrollRef.current
    const mEl = mobileScrollRef.current
    dEl?.addEventListener('scroll', calcDesktop)
    mEl?.addEventListener('scroll', calcMobile)

    return () => {
      clearTimeout(timer)
      dEl?.removeEventListener('scroll', calcDesktop)
      mEl?.removeEventListener('scroll', calcMobile)
    }
  }, [])
  const handleAddToCart = () => {
    addToCart(baseShoe, selectedSize, selectedColor, quantity)
    setAddedNotice(true)
    setTimeout(() => setAddedNotice(false), 2000)
  }

  const handleQtyAdjust = (amount) => {
    setQuantity(prev => Math.max(1, prev + amount))
  }

  return (
    <div className="flex-grow w-full bg-background text-on-background animate-fadeIn pb-24 md:pb-12 max-w-[1440px] mx-auto px-0 md:px-margin-desktop py-0 md:py-xl">

      {/* Mobile-Only Top Banner (aspect-4/5) */}
      <div className="w-full relative aspect-[4/5] bg-surface-container-low overflow-hidden border-b border-outline-variant/20 shadow-sm block md:hidden animate-slideUp">
        <img
          className="w-full h-full object-cover cursor-pointer"
          src={activeImage}
          alt="LUNARIS AeroMax Elite running shoe banner"
          onClick={() => {
            setViewerActiveImage(activeImage)
            setIsViewerOpen(true)
          }}
        />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 bg-white/90 p-2.5 rounded-full shadow-md text-black border border-outline-variant/30 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
          aria-label="Back"
        >
          <span className="material-symbols-outlined  text-[20px]">arrow_back</span>
        </button>
      </div>

      {/* Desktop & Tablet View Wrapper */}
      <div className="w-full px-margin-mobile md:px-0">

        {/* Breadcrumb - Hidden on mobile, visible on tablet/desktop */}
        <nav aria-label="Breadcrumb" className="hidden md:flex text-on-surface-variant font-body-sm text-body-sm gap-2 items-center mb-6 pt-4">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span className="text-on-surface-variant">Running</span>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span className="text-primary font-medium">AeroMax Elite</span>
        </nav>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mt-4 md:mt-0">

          {/* Left Column: Image Gallery (Vertical thumbnails + Main preview on Desktop, Grid thumbnails on Mobile) */}
          <div className="col-span-1 md:col-span-7 flex flex-col md:flex-row gap-4 h-auto md:h-[600px]">

            <div className="hidden md:block relative w-24 shrink-0">
              <div ref={desktopScrollRef} className="flex flex-col gap-3 max-h-[600px] overflow-y-auto no-scrollbar">
                {galleryImages.map((img, index) => {
                  const isActive = activeImage === img
                  return (
                    <button
                      key={index}
                      onClick={() => setActiveImage(img)}
                      className={`w-24 h-24 flex-shrink-0 bg-surface-container-low rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${isActive ? 'border-primary' : 'border-transparent hover:border-outline-variant'
                        }`}
                    >
                      <img alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" src={img} />
                    </button>
                  )
                })}
              </div>
              {desktopHiddenCount > 0 && (
                <div className="absolute bottom-0 left-0 w-full h-10 bg-black/70 flex items-center justify-center pointer-events-none">
                  <span className="text-white font-bold text-sm">+{desktopHiddenCount} more</span>
                </div>
              )}
            </div>

            {/* Desktop Main Image Display */}
            <div
              onClick={() => {
                setViewerActiveImage(activeImage)
                setIsViewerOpen(true)
              }}
              className="flex-grow bg-surface-container-low rounded-xl overflow-hidden relative border border-outline-variant/20 hidden md:block cursor-zoom-in group"
            >
              <img
                alt="Main Product Image"
                className="w-full h-full object-cover animate-fadeIn group-hover:scale-[1.02] transition-all duration-500"
                src={activeImage}
              />
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <span className="material-symbols-outlined text-white text-3xl drop-shadow-md">zoom_in</span>
              </div>
            </div>

            {/* Mobile Thumbnails Row */}
            <div className="relative md:hidden mt-2">
              <div ref={mobileScrollRef} className="flex gap-3 overflow-x-auto no-scrollbar snap-x scroll-smooth pb-1 w-full">
                {galleryImages.map((img, index) => {
                  const isActive = activeImage === img
                  return (
                    <button
                      key={index}
                      onClick={() => setActiveImage(img)}
                      className={`w-20 h-20 shrink-0 snap-start bg-surface-container-low rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${isActive ? 'border-secondary scale-102 shadow-sm' : 'border-outline-variant/40 hover:border-secondary'
                        }`}
                    >
                      <img alt={`Angle view ${index + 1}`} className="w-full h-full object-cover" src={img} />
                    </button>
                  )
                })}
              </div>
              {mobileHiddenCount > 0 && (
                <div className="absolute right-0 top-0 h-full w-16 bg-black/70 flex items-center justify-center pointer-events-none">
                  <span className="text-white font-bold text-sm">+{mobileHiddenCount}</span>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Checkout Controls / Product Details */}
          <div className="col-span-1 md:col-span-5 flex flex-col gap-lg px-0 md:px-0 mt-6 md:mt-0">

            {/* Header Info */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-black">
                  LUNARIS Footwear
                </span>
                <span className="bg-surface-container-high text-primary px-3 py-1 rounded-full font-label-sm text-label-sm uppercase tracking-widest font-bold">
                  New Release
                </span>
              </div>

              <h1 className="font-headline-lg text-headline-lg text-primary font-black tracking-tight leading-none mt-1">
                AeroMax Elite
              </h1>

              <div className="flex items-center gap-2 mt-1">
                <div className="flex text-primary">
                  <span className="material-symbols-outlined fill text-[18px] text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined fill text-[18px] text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined fill text-[18px] text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined fill text-[18px] text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined fill text-[18px] text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>star_half</span>
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant font-medium">(128 Reviews)</span>
              </div>

              <div className="font-headline-md text-headline-md text-primary font-black mt-2">
                $240.00
              </div>
            </div>

            <hr className="border-outline-variant/30" />

            {/* Color Selection */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="font-label-lg text-label-lg text-primary font-bold">Color</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant font-medium">Crimson / Obsidian</span>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedColor('Crimson')}
                  className={`w-12 h-12 rounded-full p-1 focus:outline-none transition-all cursor-pointer ${selectedColor === 'Crimson' ? 'border-2 border-primary scale-105 shadow-sm' : 'border border-outline-variant hover:border-primary'
                    }`}
                >
                  <span className="block w-full h-full rounded-full bg-red-600"></span>
                </button>
                <button
                  onClick={() => setSelectedColor('Obsidian')}
                  className={`w-12 h-12 rounded-full p-1 focus:outline-none transition-all cursor-pointer ${selectedColor === 'Obsidian' ? 'border-2 border-primary scale-105 shadow-sm' : 'border border-outline-variant hover:border-primary'
                    }`}
                >
                  <span className="block w-full h-full rounded-full bg-slate-800"></span>
                </button>
                <button
                  onClick={() => setSelectedColor('White')}
                  className={`w-12 h-12 rounded-full p-1 focus:outline-none transition-all cursor-pointer ${selectedColor === 'White' ? 'border-2 border-primary scale-105 shadow-sm' : 'border border-outline-variant hover:border-primary'
                    }`}
                >
                  <span className="block w-full h-full rounded-full bg-white border border-outline-variant"></span>
                </button>
              </div>
            </div>

            {/* Size Selection */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="font-label-lg text-label-lg text-primary font-bold">Select Size (US)</span>
                <a className="font-label-sm text-label-sm uppercase tracking-widest text-secondary hover:underline font-bold" href="#">Size Guide</a>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {['8', '8.5', '9', '9.5', '10', '10.5', '11', '12'].map(size => {
                  const isSelected = selectedSize === size
                  const isDisabled = size === '11' // Show '11' as disabled to match reference HTML
                  if (isDisabled) {
                    return (
                      <button
                        key={size}
                        disabled
                        className="py-3 border border-outline-variant rounded-lg font-body-md text-body-md text-outline-variant line-through cursor-not-allowed select-none opacity-50"
                      >
                        {size}
                      </button>
                    )
                  }
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 border rounded-lg font-body-md text-body-md text-primary transition-colors cursor-pointer ${isSelected
                        ? 'border-2 border-primary bg-surface-container-low font-bold shadow-sm'
                        : 'border-outline-variant hover:border-primary'
                        }`}
                    >
                      {size}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-4 mt-4 border-t border-outline-variant/10 pt-6">
              <div className="flex gap-4">
                {/* Qty */}
                <div className="flex items-center border border-outline-variant rounded-lg px-4 py-2 w-32 justify-between bg-surface-container-lowest">
                  <button
                    onClick={() => handleQtyAdjust(-1)}
                    className="text-on-surface-variant hover:text-primary cursor-pointer flex items-center justify-center"
                  >
                    <span className="material-symbols-outlined text-[20px]">remove</span>
                  </button>
                  <span className="font-body-md text-body-md text-primary font-bold">{quantity}</span>
                  <button
                    onClick={() => handleQtyAdjust(1)}
                    className="text-on-surface-variant hover:text-primary cursor-pointer flex items-center justify-center"
                  >
                    <span className="material-symbols-outlined text-[20px]">add</span>
                  </button>
                </div>

                {/* Add to Bag */}
                <button
                  onClick={handleAddToCart}
                  className="flex-grow bg-primary text-on-primary rounded-lg py-4 font-label-lg text-label-lg uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg border border-transparent"
                >
                  <span>{addedNotice ? 'Added to Bag!' : 'Add to Bag'}</span>
                  <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
                </button>
              </div>

              {/* Wishlist */}
              <button
                onClick={() => alert('Item saved to your wishlist!')}
                className="w-full border border-primary text-primary rounded-lg py-4 font-label-lg text-label-lg uppercase tracking-widest hover:bg-surface-container-low active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Save to Wishlist</span>
                <span className="material-symbols-outlined text-[20px]">favorite_border</span>
              </button>
            </div>

            {/* Delivery Info */}
            <div className="bg-surface-container-low rounded-lg p-4 flex items-start gap-4 mt-2 border border-outline-variant/15">
              <span className="material-symbols-outlined text-secondary">local_shipping</span>
              <div>
                <div className="font-label-lg text-label-lg text-primary font-bold">Free Standard Delivery</div>
                <div className="font-body-sm text-body-sm text-on-surface-variant mt-1">Order within 4 hrs 30 mins to receive by Thu, Oct 26.</div>
              </div>
            </div>

          </div>

        </div>

        {/* Tabs Section (Description, Specifications, Reviews) */}
        <section className="mt-xl border-t border-outline-variant/30 pt-xl">

          {/* Tab Headers */}
          <div className="flex gap-lg border-b border-outline-variant/30 mb-8 overflow-x-auto hide-scrollbar whitespace-nowrap snap-x">
            <button
              onClick={() => setActiveTab('description')}
              className={`pb-4 font-label-lg text-label-lg uppercase tracking-widest transition-all cursor-pointer snap-start shrink-0 ${activeTab === 'description' ? 'text-primary border-b-2 border-primary font-bold' : 'text-on-surface-variant hover:text-primary'
                }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('specifications')}
              className={`pb-4 font-label-lg text-label-lg uppercase tracking-widest transition-all cursor-pointer snap-start shrink-0 ${activeTab === 'specifications' ? 'text-primary border-b-2 border-primary font-bold' : 'text-on-surface-variant hover:text-primary'
                }`}
            >
              Specifications
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-4 font-label-lg text-label-lg uppercase tracking-widest transition-all cursor-pointer snap-start shrink-0 ${activeTab === 'reviews' ? 'text-primary border-b-2 border-primary font-bold' : 'text-on-surface-variant hover:text-primary'
                }`}
            >
              Reviews (128)
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'description' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-xl max-w-4xl animate-fadeIn">
              <div>
                <h3 className="font-headline-sm text-headline-sm text-primary mb-4 font-bold">Engineered for Velocity.</h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  The AeroMax Elite represents the pinnacle of LUNARIS's racing technology. Designed for marathoners seeking marginal gains, the completely re-engineered carbon-infused sole plate works in tandem with our lightest ever responsive foam. Every detail, from the micro-perforated knit upper to the lockdown lacing system, is optimized to propel you forward with maximum efficiency.
                </p>
              </div>
              <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/15 flex items-center">
                <ul className="flex flex-col gap-4 w-full">
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary">speed</span>
                    <span className="font-body-md text-body-md text-primary font-medium">Carbon-infused propulsion plate</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary">air</span>
                    <span className="font-body-md text-body-md text-primary font-medium">AeroWeave breathable upper</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary">fitness_center</span>
                    <span className="font-body-md text-body-md text-primary font-medium">Ultra-lightweight: 7.2 oz (Size 9)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary">water_drop</span>
                    <span className="font-body-md text-body-md text-primary font-medium">Moisture-wicking interior lining</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'specifications' && (
            <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/25 animate-fadeIn">
              <table className="w-full text-left text-xs border-collapse">
                <tbody>
                  <tr className="border-b border-outline-variant/10">
                    <td className="py-3.5 pr-4 font-black text-on-surface-variant uppercase tracking-wider w-1/3 min-w-[140px] md:w-1/4">Midsole Drop</td>
                    <td className="py-3.5 text-primary font-bold text-sm">6 mm</td>
                  </tr>
                  <tr className="border-b border-outline-variant/10">
                    <td className="py-3.5 pr-4 font-black text-on-surface-variant uppercase tracking-wider w-1/3 min-w-[140px] md:w-1/4">Weight</td>
                    <td className="py-3.5 text-primary font-bold text-sm">7.2 oz (Size 9)</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 pr-4 font-black text-on-surface-variant uppercase tracking-wider w-1/3 min-w-[140px] md:w-1/4">Propulsion</td>
                    <td className="py-3.5 text-primary font-bold text-sm">Carbon Fiber Sole Plate</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="max-w-2xl flex flex-col gap-6 animate-fadeIn">
              <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/20 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-primary">Marcus V.</span>
                    <span className="bg-emerald-500/10 text-emerald-500 text-[10px] uppercase tracking-widest px-2 py-0.5 rounded font-black">Verified Buyer</span>
                  </div>
                  <span className="text-[10px] text-outline">Oct 12, 2026</span>
                </div>
                <div className="flex text-amber-500">
                  <span className="material-symbols-outlined fill text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined fill text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined fill text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined fill text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined fill text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed font-medium">
                  "Shaved nearly 4 minutes off my marathon personal best in Chicago. The propulsion of the carbon fiber plate is incredible, but what surprised me is how responsive and cushioned it feels at mile 20. Essential race gear."
                </p>
              </div>
            </div>
          )}

        </section>

        {/* Complete the Look Section */}
        <section className="mt-xl pt-xl border-t border-outline-variant/30">
          <h2 className="font-headline-md text-headline-md text-primary mb-8 font-black uppercase tracking-wider">
            Complete The Look
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
            {accessoryProducts.map(prod => (
              <div
                key={prod.id}
                className="group flex flex-col gap-4 cursor-pointer"
                onClick={() => alert(`Accessory ${prod.name} item page is coming soon!`)}
              >
                <div className="bg-surface-container-low rounded-xl aspect-square overflow-hidden relative shadow-[0_4px_12px_rgba(13,27,42,0.05)] border border-surface-variant">
                  <img
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={prod.imgSrc}
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      alert(`${prod.name} saved to your wishlist!`)
                    }}
                    className="absolute bottom-4 right-4 bg-surface rounded-full p-2.5 shadow-md hover:bg-primary hover:text-on-primary transition-colors text-primary flex items-center justify-center cursor-pointer border border-outline-variant/30"
                  >
                    <span className="material-symbols-outlined text-[18px]">favorite</span>
                  </button>
                </div>
                <div>
                  <div className="font-label-sm text-label-sm uppercase tracking-widest text-secondary mb-1 font-black">{prod.category}</div>
                  <div className="font-label-lg text-label-lg text-primary font-bold">{prod.name}</div>
                  <div className="font-body-sm text-body-sm text-on-surface-variant mt-1 font-semibold">{prod.price}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Flipkart-Style Premium Image Viewer Modal */}
      {isViewerOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 md:p-6 animate-fadeIn"
          onClick={closeViewer}
        >
          {/* Header */}
          <div className="w-full flex justify-between items-center z-10">
            <div>
              <span className="text-secondary text-xs uppercase tracking-widest font-bold">Lunaris Performance</span>
              <h2 className="text-white text-lg font-bold tracking-tight mt-0.5">AeroMax Elite</h2>
            </div>
            <button
              onClick={closeViewer}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 transition-all text-white flex items-center justify-center cursor-pointer border border-white/10"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
          </div>

          {/* Main Viewer Body with Floating Navigation Arrows */}
          <div className="relative flex-grow flex items-center justify-center my-4 overflow-hidden">
            {/* Left Nav Arrow */}
            <button
              onClick={handleViewerPrev}
              className="absolute left-2 md:left-4 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center cursor-pointer border border-white/10 active:scale-90 transition-all select-none"
              aria-label="Previous image"
            >
              <span className="material-symbols-outlined text-[28px] md:text-[32px]">chevron_left</span>
            </button>

            {/* Main Zoomable Image */}
            <img
              src={viewerActiveImage}
              alt="LUNARIS Product Detail Zoomed"
              className="max-h-[60vh] max-w-[85vw] md:max-h-[70vh] md:max-w-[75vw] object-contain rounded-xl shadow-2xl transition-all duration-300 transform scale-100 hover:scale-[1.03] select-none cursor-default"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Right Nav Arrow */}
            <button
              onClick={handleViewerNext}
              className="absolute right-2 md:right-4 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center cursor-pointer border border-white/10 active:scale-90 transition-all select-none"
              aria-label="Next image"
            >
              <span className="material-symbols-outlined text-[28px] md:text-[32px]">chevron_right</span>
            </button>
          </div>

          {/* Flipkart-Style Previews Row at Bottom */}
          <div className="w-full flex flex-col items-center gap-3 z-10 mb-2">
            <span className="text-white/40 text-[10px] uppercase tracking-wider font-semibold">
              Image {galleryImages.indexOf(viewerActiveImage) + 1} of {galleryImages.length}
            </span>
            <div
              className="flex gap-3 overflow-x-auto max-w-full no-scrollbar px-4 pb-2 snap-x scroll-smooth"
              onClick={(e) => e.stopPropagation()}
            >
              {galleryImages.map((img, idx) => {
                const isActive = viewerActiveImage === img
                return (
                  <button
                    key={idx}
                    onClick={() => setViewerActiveImage(img)}
                    className={`w-14 h-14 md:w-18 md:h-18 rounded-lg overflow-hidden border-2 shrink-0 snap-center transition-all cursor-pointer ${isActive
                      ? 'border-secondary scale-105 shadow-[0_0_15px_rgba(203,213,224,0.4)]'
                      : 'border-white/10 opacity-60 hover:opacity-100 hover:border-white/40'
                      }`}
                  >
                    <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
