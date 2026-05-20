import { useState, useEffect } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export default function StorefrontSettings() {
  const [formData, setFormData] = useState({
    title: '',
    story: '',
    mission: '',
    team: '',
    heroImage: '',
    storyImage: '',
    customSections: []
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  // Fetch current live about settings on mount
  useEffect(() => {
    fetch(`${API_URL}/api/storefront/about`)
      .then(res => res.json())
      .then(data => {
        setFormData({
          title: data.title || '',
          story: data.story || '',
          mission: data.mission || '',
          team: data.team || '',
          heroImage: data.heroImage || '',
          storyImage: data.storyImage || '',
          customSections: data.customSections || []
        })
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load storefront details:', err)
        setMessage({ type: 'error', text: 'Failed to retrieve storefront settings from server.' })
        setLoading(false)
      })
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Read uploaded files as Base64 Data URLs
  const handleFileChange = (e, field) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setMessage({ type: 'error', text: 'Selected image exceeds the 5MB file upload limit.' })
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, [field]: reader.result }))
        setMessage({ type: '', text: '' })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleClearImage = (field) => {
    setFormData(prev => ({ ...prev, [field]: '' }))
  }

  // Dynamic Section Constructor actions
  const handleAddSection = () => {
    setFormData(prev => ({
      ...prev,
      customSections: [
        ...(prev.customSections || []),
        {
          id: `sec_${Date.now()}`,
          type: 'paragraph', // default
          title: '',
          content: '',
          icon: 'eco'
        }
      ]
    }))
  }

  const handleRemoveSection = (id) => {
    setFormData(prev => ({
      ...prev,
      customSections: prev.customSections.filter(sec => sec.id !== id)
    }))
  }

  const handleSectionChange = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      customSections: prev.customSections.map(sec => {
        if (sec.id === id) {
          return { ...sec, [field]: value }
        }
        return sec
      })
    }))
  }

  const handleMoveSection = (index, direction) => {
    const sections = [...(formData.customSections || [])]
    const targetIndex = index + direction
    if (targetIndex < 0 || targetIndex >= sections.length) return

    // Swap items
    const temp = sections[index]
    sections[index] = sections[targetIndex]
    sections[targetIndex] = temp

    setFormData(prev => ({ ...prev, customSections: sections }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMessage({ type: '', text: '' })

    try {
      const res = await fetch(`${API_URL}/api/storefront/about`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json()
      if (res.ok) {
        setMessage({ type: 'success', text: 'Storefront About Us settings published successfully!' })
      } else {
        setMessage({ type: 'error', text: data.detail || 'Failed to save modifications.' })
      }
    } catch (err) {
      console.error('Failed to save settings:', err)
      setMessage({ type: 'error', text: 'Network connection failure. Try again.' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex h-[60vh] w-full items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <svg className="animate-spin h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span className="text-[10px] uppercase font-black tracking-widest text-on-surface-variant">Syncing Storefront Schema...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="animate-fadeIn max-w-[800px] mx-auto text-left pb-16">
      {/* Title Header */}
      <div className="mb-6">
        <h1 className="text-xl font-black uppercase tracking-wider text-primary">Storefront Settings</h1>
        <p className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold opacity-75 mt-1">
          Manage public marketing components and dynamic static pages.
        </p>
      </div>

      {/* Editor Panel */}
      <form onSubmit={handleSubmit} className="bg-surface-container border border-outline/20 rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-md">
        <div className="flex items-center gap-3 border-b border-outline/15 pb-4">
          <span className="material-symbols-outlined text-primary text-[24px]">chrome_reader_mode</span>
          <div>
            <h2 className="text-sm font-black uppercase tracking-wider text-primary">About Us Page Content</h2>
            <p className="text-[10px] text-on-surface-variant uppercase font-semibold">Updates are reflected instantly on the main website.</p>
          </div>
        </div>

        {/* Message Indicator */}
        {message.text && (
          <div className={`p-4 rounded-xl text-xs font-bold ${
            message.type === 'success' 
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
              : 'bg-red-500/10 text-red-400 border border-red-500/20'
          }`}>
            {message.type === 'success' ? '✓ ' : '✗ '} {message.text}
          </div>
        )}

        {/* Inputs */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] uppercase font-black tracking-widest text-primary">Page Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="e.g. About LUNARIS"
            className="w-full bg-surface-container-high border border-outline/35 focus:border-primary focus:outline-none rounded-xl px-4 py-3 text-xs text-primary font-semibold placeholder:text-on-surface-variant/40"
          />
        </div>

        {/* Hero Banner Background Image Uploader */}
        <div className="flex flex-col gap-2 border-t border-outline/10 pt-4">
          <label className="text-[10px] uppercase font-black tracking-widest text-primary">Hero Banner Background Image</label>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-8 flex flex-col gap-2">
              <input
                type="text"
                name="heroImage"
                value={formData.heroImage}
                onChange={handleChange}
                placeholder="Paste external image link URL..."
                className="w-full bg-surface-container-high border border-outline/35 focus:border-primary focus:outline-none rounded-xl px-4 py-3 text-xs text-primary font-semibold placeholder:text-on-surface-variant/40"
              />
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'heroImage')}
                  className="hidden"
                  id="hero-image-file"
                />
                <label
                  htmlFor="hero-image-file"
                  className="flex items-center justify-center gap-2 border border-dashed border-outline/35 hover:border-primary rounded-xl py-3 px-4 text-xs font-bold text-on-surface-variant hover:text-primary cursor-pointer transition-colors w-full"
                >
                  <span className="material-symbols-outlined text-[18px]">cloud_upload</span>
                  <span>Upload Local File (Auto-Base64)</span>
                </label>
              </div>
            </div>
            <div className="md:col-span-4 flex items-center justify-center bg-surface-container-high border border-outline/35 rounded-2xl p-2 min-h-[110px] relative overflow-hidden group">
              {formData.heroImage ? (
                <>
                  <img
                    src={formData.heroImage}
                    alt="Hero Preview"
                    className="max-h-[94px] max-w-full object-contain rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => handleClearImage('heroImage')}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-md flex items-center justify-center cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[14px]">close</span>
                  </button>
                </>
              ) : (
                <span className="text-[10px] text-on-surface-variant/40 uppercase font-black">No Preview</span>
              )}
            </div>
          </div>
        </div>

        {/* Brand Story Image Uploader */}
        <div className="flex flex-col gap-2 border-t border-outline/10 pt-4">
          <label className="text-[10px] uppercase font-black tracking-widest text-primary">Brand Story Section Image</label>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-8 flex flex-col gap-2">
              <input
                type="text"
                name="storyImage"
                value={formData.storyImage}
                onChange={handleChange}
                placeholder="Paste external image link URL..."
                className="w-full bg-surface-container-high border border-outline/35 focus:border-primary focus:outline-none rounded-xl px-4 py-3 text-xs text-primary font-semibold placeholder:text-on-surface-variant/40"
              />
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'storyImage')}
                  className="hidden"
                  id="story-image-file"
                />
                <label
                  htmlFor="story-image-file"
                  className="flex items-center justify-center gap-2 border border-dashed border-outline/35 hover:border-primary rounded-xl py-3 px-4 text-xs font-bold text-on-surface-variant hover:text-primary cursor-pointer transition-colors w-full"
                >
                  <span className="material-symbols-outlined text-[18px]">cloud_upload</span>
                  <span>Upload Local File (Auto-Base64)</span>
                </label>
              </div>
            </div>
            <div className="md:col-span-4 flex items-center justify-center bg-surface-container-high border border-outline/35 rounded-2xl p-2 min-h-[110px] relative overflow-hidden group">
              {formData.storyImage ? (
                <>
                  <img
                    src={formData.storyImage}
                    alt="Story Preview"
                    className="max-h-[94px] max-w-full object-contain rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => handleClearImage('storyImage')}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-md flex items-center justify-center cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[14px]">close</span>
                  </button>
                </>
              ) : (
                <span className="text-[10px] text-on-surface-variant/40 uppercase font-black">No Preview</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 border-t border-outline/10 pt-4">
          <label className="text-[10px] uppercase font-black tracking-widest text-primary">Brand Story</label>
          <textarea
            name="story"
            value={formData.story}
            onChange={handleChange}
            required
            rows={5}
            placeholder="Tell your brand's story..."
            className="w-full bg-surface-container-high border border-outline/35 focus:border-primary focus:outline-none rounded-xl px-4 py-3 text-xs text-primary font-medium leading-relaxed placeholder:text-on-surface-variant/40"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] uppercase font-black tracking-widest text-primary">Our Mission</label>
          <textarea
            name="mission"
            value={formData.mission}
            onChange={handleChange}
            required
            rows={3}
            placeholder="Define your main mission statement..."
            className="w-full bg-surface-container-high border border-outline/35 focus:border-primary focus:outline-none rounded-xl px-4 py-3 text-xs text-primary font-medium leading-relaxed placeholder:text-on-surface-variant/40"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] uppercase font-black tracking-widest text-primary">visionaries & Team</label>
          <textarea
            name="team"
            value={formData.team}
            onChange={handleChange}
            required
            rows={3}
            placeholder="Describe your design and engineering teams..."
            className="w-full bg-surface-container-high border border-outline/35 focus:border-primary focus:outline-none rounded-xl px-4 py-3 text-xs text-primary font-medium leading-relaxed placeholder:text-on-surface-variant/40"
          />
        </div>

        {/* Dynamic Page Constructor Builder Section */}
        <div className="flex flex-col gap-4 border-t border-outline/15 pt-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider text-primary">Dynamic Page Constructor</h3>
              <p className="text-[10px] text-on-surface-variant uppercase font-semibold">Append and customize dynamic card grids or rich paragraphs.</p>
            </div>
            <button
              type="button"
              onClick={handleAddSection}
              className="bg-secondary/10 hover:bg-secondary/20 text-secondary border border-secondary/30 font-bold uppercase tracking-wider text-[10px] px-3 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[14px]">add_circle</span>
              <span>Add Custom Section</span>
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {(!formData.customSections || formData.customSections.length === 0) ? (
              <div className="border border-dashed border-outline/25 rounded-2xl p-6 text-center text-on-surface-variant/50 font-bold text-xs">
                No custom sections appended yet. Tap "+ Add Custom Section" above to construct layouts!
              </div>
            ) : (
              formData.customSections.map((sec, idx) => (
                <div key={sec.id} className="bg-surface-container-high border border-outline/30 rounded-2xl p-4 md:p-5 flex flex-col gap-4 relative">
                  {/* Row Controls */}
                  <div className="flex justify-between items-center border-b border-outline/15 pb-2">
                    <span className="text-[10px] uppercase font-black tracking-widest text-[#C8C8CC] bg-[#1e1e20] px-2.5 py-1 rounded-md">
                      Section #{idx + 1}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => handleMoveSection(idx, -1)}
                        className="text-on-surface-variant hover:text-primary transition-colors disabled:opacity-30 cursor-pointer flex items-center justify-center p-1"
                        title="Move Up"
                      >
                        <span className="material-symbols-outlined text-[18px]">arrow_upward</span>
                      </button>
                      <button
                        type="button"
                        disabled={idx === formData.customSections.length - 1}
                        onClick={() => handleMoveSection(idx, 1)}
                        className="text-on-surface-variant hover:text-primary transition-colors disabled:opacity-30 cursor-pointer flex items-center justify-center p-1"
                        title="Move Down"
                      >
                        <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveSection(sec.id)}
                        className="text-red-400 hover:text-red-500 transition-colors cursor-pointer flex items-center justify-center p-1"
                        title="Delete Section"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  </div>

                  {/* Section Controls Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-[9px] uppercase font-black tracking-widest text-primary">Layout Type</label>
                      <select
                        value={sec.type}
                        onChange={(e) => handleSectionChange(sec.id, 'type', e.target.value)}
                        className="w-full bg-surface-container border border-outline/35 focus:border-primary focus:outline-none rounded-xl px-4 py-2.5 text-xs text-primary font-semibold"
                      >
                        <option value="paragraph">Full Width Rich Paragraph</option>
                        <option value="card">Grid Info Card</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-[9px] uppercase font-black tracking-widest text-primary">Section Title / Headline</label>
                      <input
                        type="text"
                        value={sec.title}
                        onChange={(e) => handleSectionChange(sec.id, 'title', e.target.value)}
                        placeholder="e.g. Eco-Friendly Footwear"
                        className="w-full bg-surface-container border border-outline/35 focus:border-primary focus:outline-none rounded-xl px-4 py-2.5 text-xs text-primary font-semibold placeholder:text-on-surface-variant/40"
                      />
                    </div>
                  </div>

                  {/* Optional Icon (Only for Card Type) */}
                  {sec.type === 'card' && (
                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-[9px] uppercase font-black tracking-widest text-primary">Card Icon (Google Material Icon name)</label>
                      <input
                        type="text"
                        value={sec.icon || 'eco'}
                        onChange={(e) => handleSectionChange(sec.id, 'icon', e.target.value)}
                        placeholder="e.g. eco, bolt, speed, star, footprint, rocket_launch"
                        className="w-full bg-surface-container border border-outline/35 focus:border-primary focus:outline-none rounded-xl px-4 py-2.5 text-xs text-primary font-semibold placeholder:text-on-surface-variant/40"
                      />
                      <span className="text-[8px] text-on-surface-variant/60 uppercase font-semibold">Common terms: eco, bolt, speed, star, footprint, rocket_launch, group, workspace_premium</span>
                    </div>
                  )}

                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-[9px] uppercase font-black tracking-widest text-primary">Section Description / Content</label>
                    <textarea
                      value={sec.content}
                      onChange={(e) => handleSectionChange(sec.id, 'content', e.target.value)}
                      rows={3}
                      placeholder="Write your custom section description copywriting..."
                      className="w-full bg-surface-container border border-outline/35 focus:border-primary focus:outline-none rounded-xl px-4 py-2.5 text-xs text-primary font-medium placeholder:text-on-surface-variant/40"
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Form CTA */}
        <div className="border-t border-outline/15 pt-5 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="bg-primary text-on-primary font-black uppercase tracking-widest text-xs px-6 py-3 rounded-xl hover:opacity-90 active:scale-95 transition-all cursor-pointer flex items-center gap-2 select-none shadow-md disabled:opacity-50"
          >
            {saving ? (
              <>
                <svg className="animate-spin h-4 w-4 text-on-primary" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Publishing...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[16px]">publish</span>
                <span>Save & Publish Changes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
