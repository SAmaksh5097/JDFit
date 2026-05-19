import { useState, useEffect } from "react"
import { useAuth } from "@clerk/clerk-react"

const fieldBaseClass =
  "mt-2 w-full rounded-lg border border-white/15 bg-slate-900/60 px-3 py-2.5 text-sm text-white placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"

const sectionClass =
  "rounded-2xl border border-white/10 bg-slate-950/55 p-5 sm:p-6 shadow-[0_10px_35px_rgba(2,6,23,0.45)]"

const ProfileForm = () => {
  const { userId } = useAuth()

  const [profileData, setProfileData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const [workEntries, setWorkEntries] = useState([])
  const [educationEntries, setEducationEntries] = useState([])
  const [projectEntries, setProjectEntries] = useState([])
  const [skillEntries, setSkillEntries] = useState([])

  useEffect(() => {
    if (userId) {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/profile/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.profile) {
            setProfileData(data.profile)
            if (data.profile.experience?.length) {
              setWorkEntries(data.profile.experience.map((exp, i) => ({ id: `exp-${i}`, ...exp })))
            }
            if (data.profile.education?.length) {
              setEducationEntries(data.profile.education.map((edu, i) => ({ id: `edu-${i}`, ...edu })))
            }
            if (data.profile.skills?.length) {
              setSkillEntries(data.profile.skills.map((s, i) => ({ id: `skill-${i}`, ...s })))
            }
            if (data.profile.projects?.length) {
              setProjectEntries(data.profile.projects.map((p, i) => ({ id: `proj-${i}`, ...p })))
            }
          }
          setIsLoading(false)
        })
        .catch((err) => {
          console.error("Error fetching profile", err)
          setIsLoading(false)
        })
    } else {
      setIsLoading(false)
    }
  }, [userId])

  const addWorkEntry = () => {
    setWorkEntries((currentEntries) => [
      ...currentEntries,
      { id: `${Date.now()}-${Math.random().toString(16).slice(2)}` },
    ])
  }

  const removeWorkEntry = (entryId) => {
    setWorkEntries((currentEntries) => currentEntries.filter((entry) => entry.id !== entryId))
  }

  const addEducationEntry = () => {
    setEducationEntries((currentEntries) => [
      ...currentEntries,
      { id: `${Date.now()}-${Math.random().toString(16).slice(2)}` },
    ])
  }

  const removeEducationEntry = (entryId) => {
    setEducationEntries((currentEntries) => currentEntries.filter((entry) => entry.id !== entryId))
  }

  const addProjectEntry = () => {
    setProjectEntries((currentEntries) => [
      ...currentEntries,
      { id: `${Date.now()}-${Math.random().toString(16).slice(2)}` },
    ])
  }

  const removeProjectEntry = (entryId) => {
    setProjectEntries((currentEntries) => currentEntries.filter((entry) => entry.id !== entryId))
  }

  const addSkillEntry = () => {
    setSkillEntries((currentEntries) => [
      ...currentEntries,
      { id: `${Date.now()}-${Math.random().toString(16).slice(2)}` },
    ])
  }

  const removeSkillEntry = (entryId) => {
    setSkillEntries((currentEntries) => currentEntries.filter((entry) => entry.id !== entryId))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!userId) {
      alert("You must be logged in to save your profile.")
      return
    }

    const formData = new FormData(e.target)
    
    const payload = {
      clerkUserId: userId,
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      linkedin: formData.get('linkedin'),
      github: formData.get('github'),
      workExperience: workEntries.map(entry => ({
        id: entry.id,
        [`company-${entry.id}`]: formData.get(`company-${entry.id}`),
        [`role-${entry.id}`]: formData.get(`role-${entry.id}`),
        [`startDate-${entry.id}`]: formData.get(`startDate-${entry.id}`),
        [`endDate-${entry.id}`]: formData.get(`endDate-${entry.id}`),
        [`workSummary-${entry.id}`]: formData.get(`workSummary-${entry.id}`),
      })),
      education: educationEntries.map(entry => ({
        id: entry.id,
        [`institution-${entry.id}`]: formData.get(`institution-${entry.id}`),
        [`degree-${entry.id}`]: formData.get(`degree-${entry.id}`),
        [`from-${entry.id}`]: formData.get(`from-${entry.id}`),
        [`to-${entry.id}`]: formData.get(`to-${entry.id}`),
        [`cgpa-${entry.id}`]: formData.get(`cgpa-${entry.id}`),
      })),
      skills: skillEntries.map(entry => ({
        id: entry.id,
        [`skillHeading-${entry.id}`]: formData.get(`skillHeading-${entry.id}`),
        [`skillBullets-${entry.id}`]: formData.get(`skillBullets-${entry.id}`),
      })),
      projects: projectEntries.map(entry => ({
        id: entry.id,
        [`projectName-${entry.id}`]: formData.get(`projectName-${entry.id}`),
        [`projectRole-${entry.id}`]: formData.get(`projectRole-${entry.id}`),
        [`projectUrl-${entry.id}`]: formData.get(`projectUrl-${entry.id}`),
        [`projectDescription-${entry.id}`]: formData.get(`projectDescription-${entry.id}`),
      }))
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      
      if (response.ok) {
        alert('Profile saved successfully!')
      } else {
        const data = await response.json()
        alert(`Error: ${data.error || 'Failed to save profile'}`)
      }
    } catch (error) {
      console.error('Error saving profile:', error)
      alert('An error occurred while saving the profile.')
    }
  }

  if (isLoading) {
    return <div className="min-h-screen grid place-items-center bg-black text-white text-sm sm:text-base">Loading profile details...</div>
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-black via-black to-blue-950/10 px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-10">
      <div className="mx-auto max-w-6xl rounded-2xl sm:rounded-3xl border border-white/10 bg-black/80 p-4 sm:p-6 md:p-8 shadow-2xl shadow-blue-900/10">
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-0">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-300">Profile Setup</p>
            <h1 className="mt-1 sm:mt-2 text-xl sm:text-2xl md:text-3xl font-semibold text-white">Build your profile</h1>
          </div>
        </div>

        <div className="mb-6 sm:mb-8 grid grid-cols-3 items-center gap-2 sm:gap-4 text-xs sm:text-sm">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="grid h-6 w-6 sm:h-7 sm:w-7 place-items-center rounded-full bg-blue-600 text-xs sm:text-sm font-bold text-white flex-shrink-0">1</span>
            <span className="font-medium text-blue-200 hidden sm:inline">Personal Info</span>
            <span className="font-medium text-blue-200 sm:hidden">Info</span>
          </div>
          <div className="h-0.5 bg-white/10" />
          <div className="text-right text-slate-400 hidden sm:block">Experience & Skills</div>
          <div className="text-right text-slate-400 sm:hidden">More</div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
          <div className={sectionClass}>
            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white">Personal Information</h2>
            <div className="mt-4 sm:mt-5 grid gap-3 sm:gap-4 sm:grid-cols-2">
              <label className="text-xs sm:text-sm text-slate-200">
                Full Name*
                <input className={fieldBaseClass} type="text" required name="fullName" defaultValue={profileData?.name || ''} />
              </label>
              
              <label className="text-xs sm:text-sm text-slate-200">
                Email Address*
                <input className={fieldBaseClass} required type="email" name="email" defaultValue={profileData?.email || ''} />
              </label>
              <label className="text-xs sm:text-sm text-slate-200">
                Phone Number
                <input className={fieldBaseClass} type="tel" name="phone" defaultValue={profileData?.phone || ''} />
              </label>
              <label className="text-xs sm:text-sm text-slate-200">
                LinkedIn Profile
                <input className={fieldBaseClass} type="url" name="linkedin" placeholder="https://linkedin.com/in/..." defaultValue={profileData?.social_links?.find(l => l.platform_name === 'LinkedIn')?.url || ''} />
              </label>

              <label className="text-xs sm:text-sm text-slate-200">
                GitHub Profile
                <input className={fieldBaseClass} type="url" name="github" placeholder="https://github.com/..." defaultValue={profileData?.social_links?.find(l => l.platform_name === 'GitHub')?.url || ''} />
              </label>
            </div>
          </div>

          <div className={sectionClass}>
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-white">Work Experience</h2>
              <button
                type="button"
                onClick={addWorkEntry}
                className="rounded-lg border border-blue-500/40 px-3 py-1.5 text-sm font-medium text-blue-300 transition hover:border-blue-400 hover:bg-blue-500/10"
              >
                +
              </button>
            </div>

            {workEntries.length === 0 ? (
              <p className="mt-5 text-sm text-slate-400">No work experience added yet.</p>
            ) : (
              <div className="mt-5 space-y-4">
                {workEntries.map((entry, index) => (
                  <div key={entry.id} className="rounded-2xl border border-white/10 bg-black/30 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
                        Experience {index + 1}
                      </p>
                      <button
                        type="button"
                        onClick={() => removeWorkEntry(entry.id)}
                        className="rounded-md border border-red-500/30 px-2.5 py-1 text-xs font-medium text-red-300 transition hover:border-red-400 hover:bg-red-500/10"
                      >
                        Delete
                      </button>
                    </div>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <label className="text-sm text-slate-200">
                        Company
                        <input className={fieldBaseClass} type="text" name={`company-${entry.id}`} placeholder="Innovate Tech" defaultValue={entry.company || ''} />
                      </label>
                      <label className="text-sm text-slate-200">
                        Role
                        <input className={fieldBaseClass} type="text" name={`role-${entry.id}`} placeholder="Lead UI/UX Designer" defaultValue={entry.role || ''} />
                      </label>
                      <label className="text-sm text-slate-200">
                        Start Date
                        <input className={fieldBaseClass} type="month" name={`startDate-${entry.id}`} defaultValue={entry.start_date ? `${entry.start_date}-01` : ''} />
                      </label>
                      <label className="text-sm text-slate-200">
                        End Date
                        <input className={fieldBaseClass} type="month" name={`endDate-${entry.id}`} defaultValue={entry.end_date ? `${entry.end_date}-01` : ''} />
                      </label>
                      <label className="text-sm text-slate-200 sm:col-span-2">
                        Description & Key Achievements
                        <textarea
                          className={fieldBaseClass}
                          name={`workSummary-${entry.id}`}
                          rows="3"
                          placeholder="Describe outcomes, ownership, and measurable impact..."
                          defaultValue={entry.description || ''}
                        />
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={sectionClass}>
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-white">Education</h2>
              <button
                type="button"
                onClick={addEducationEntry}
                className="rounded-lg border border-blue-500/40 px-3 py-1.5 text-sm font-medium text-blue-300 transition hover:border-blue-400 hover:bg-blue-500/10"
              >
                +
              </button>
            </div>

            {educationEntries.length === 0 ? (
              <p className="mt-5 text-sm text-slate-400">No education entry added yet.</p>
            ) : (
              <div className="mt-5 space-y-4">
                {educationEntries.map((entry, index) => (
                  <div key={entry.id} className="rounded-2xl border border-white/10 bg-black/30 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">Education {index + 1}</p>
                      <button
                        type="button"
                        onClick={() => removeEducationEntry(entry.id)}
                        className="rounded-md border border-red-500/30 px-2.5 py-1 text-xs font-medium text-red-300 transition hover:border-red-400 hover:bg-red-500/10"
                      >
                        Delete
                      </button>
                    </div>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <label className="text-sm text-slate-200">
                        Institution
                        <input className={fieldBaseClass} type="text" name={`institution-${entry.id}`} placeholder="Design University of NY" defaultValue={entry.institution || ''} />
                      </label>
                      <label className="text-sm text-slate-200">
                        Degree
                        <input className={fieldBaseClass} type="text" name={`degree-${entry.id}`} placeholder="BFA in Interaction Design" defaultValue={entry.degree || ''} />
                      </label>
                      <label className="text-sm text-slate-200">
                        From
                        <input className={fieldBaseClass} type="text" name={`from-${entry.id}`} placeholder="YYYY" defaultValue={entry.start_year || ''} />
                      </label>
                      <label className="text-sm text-slate-200">
                        To (or Expected)
                        <input className={fieldBaseClass} type="text" name={`to-${entry.id}`} placeholder="YYYY" defaultValue={entry.end_year || ''} />
                      </label>
                      <label className="text-sm text-slate-200 w-[10%] sm:col-span-2">
                        CGPA
                        <input className={fieldBaseClass} type="text" name={`cgpa-${entry.id}`} defaultValue={entry.cgpa || ''} />
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={sectionClass}>
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-white">Skills & Expertise</h2>
              <button
                type="button"
                onClick={addSkillEntry}
                className="rounded-lg border border-blue-500/40 px-3 py-1.5 text-sm font-medium text-blue-300 transition hover:border-blue-400 hover:bg-blue-500/10"
              >
                +
              </button>
            </div>

            {skillEntries.length === 0 ? (
              <p className="mt-5 text-sm text-slate-400">No skills section added yet.</p>
            ) : (
              <div className="mt-5 space-y-4">
                {skillEntries.map((entry, index) => (
                  <div key={entry.id} className="rounded-2xl border border-white/10 bg-black/30 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">Skill Group {index + 1}</p>
                      <button
                        type="button"
                        onClick={() => removeSkillEntry(entry.id)}
                        className="rounded-md border border-red-500/30 px-2.5 py-1 text-xs font-medium text-red-300 transition hover:border-red-400 hover:bg-red-500/10"
                      >
                        Delete
                      </button>
                    </div>
                    <div className="mt-4 grid gap-4">
                      <label className="text-sm text-slate-200">
                        Heading
                        <input
                          className={fieldBaseClass}
                          type="text"
                          name={`skillHeading-${entry.id}`}
                          placeholder="Frontend Development"
                          defaultValue={entry.category || ''}
                        />
                      </label>
                      <label className="text-sm text-slate-200">
                        Bullet Points
                        <textarea
                          className={fieldBaseClass}
                          name={`skillBullets-${entry.id}`}
                          rows="4"
                          placeholder="• React\n• Tailwind CSS\n• UI Architecture"
                          defaultValue={entry.skills_list || ''}
                        />
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>

          <div className={sectionClass}>
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-white">Projects</h2>
              <button
                type="button"
                onClick={addProjectEntry}
                className="rounded-lg border border-blue-500/40 px-3 py-1.5 text-sm font-medium text-blue-300 transition hover:border-blue-400 hover:bg-blue-500/10"
              >
                +
              </button>
            </div>

            {projectEntries.length === 0 ? (
              <p className="mt-5 text-sm text-slate-400">No project added yet.</p>
            ) : (
              <div className="mt-5 space-y-4">
                {projectEntries.map((entry, index) => (
                  <div key={entry.id} className="rounded-2xl border border-white/10 bg-black/30 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">Project {index + 1}</p>
                      <button
                        type="button"
                        onClick={() => removeProjectEntry(entry.id)}
                        className="rounded-md border border-red-500/30 px-2.5 py-1 text-xs font-medium text-red-300 transition hover:border-red-400 hover:bg-red-500/10"
                      >
                        Delete
                      </button>
                    </div>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <label className="text-sm text-slate-200">
                        Project Name
                        <input className={fieldBaseClass} type="text" name={`projectName-${entry.id}`} placeholder="Portfolio Redesign" defaultValue={entry.title || ''} />
                      </label>
                      <label className="text-sm text-slate-200">
                        Tech Stack
                        <input className={fieldBaseClass} type="text" name={`projectRole-${entry.id}`} defaultValue={entry.tech_stack || ''} />
                      </label>
                      <label className="text-sm text-slate-200 sm:col-span-2">
                        Link
                        <input className={fieldBaseClass} type="url" name={`projectUrl-${entry.id}`} placeholder="https://your-project.com" defaultValue={entry.live_url || ''} />
                      </label>
                      <label className="text-sm text-slate-200 sm:col-span-2">
                        Description
                        <textarea
                          className={fieldBaseClass}
                          name={`projectDescription-${entry.id}`}
                          rows="3"
                          placeholder="Describe your goal, stack, and measurable impact..."
                          defaultValue={entry.description || ''}
                        />
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="z-10 flex justify-end rounded-2xl   p-4 backdrop-blur">
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default ProfileForm
