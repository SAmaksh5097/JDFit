import { useState } from "react"

const fieldBaseClass =
  "mt-2 w-full rounded-lg border border-white/15 bg-slate-900/60 px-3 py-2.5 text-sm text-white placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"

const sectionClass =
  "rounded-2xl border border-white/10 bg-slate-950/55 p-5 sm:p-6 shadow-[0_10px_35px_rgba(2,6,23,0.45)]"

const ProfileForm = () => {
  const [workEntries, setWorkEntries] = useState([])
  const [educationEntries, setEducationEntries] = useState([])
  const [projectEntries, setProjectEntries] = useState([])
  const [skillEntries, setSkillEntries] = useState([])

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

  return (
    <section className="min-h-screen bg-linear-to-b from-black via-black to-blue-950/20 px-4 py-8 sm:px-8 sm:py-10">
      <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-black/80 p-4 shadow-2xl shadow-blue-900/10 sm:p-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">Profile Setup</p>
            <h1 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">Build your profile</h1>
          </div>

        </div>

        <div className="mb-8 grid grid-cols-3 items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-blue-600 text-xs font-bold text-white">1</span>
            <span className="text-sm font-medium text-blue-200">Personal Info</span>
          </div>
          <div className="h-0.5 bg-white/10" />
          <div className="text-right text-sm text-slate-400">Experience & Skills</div>
        </div>

        <form className="space-y-5">
          <div className={sectionClass}>
            <h2 className="text-lg font-semibold text-white">Personal Information</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="text-sm text-slate-200">
                Full Name*
                <input className={fieldBaseClass} type="text" required name="fullName" />
              </label>
              
              <label className="text-sm text-slate-200">
                Email Address*
                <input className={fieldBaseClass} required type="email" name="email" />
              </label>
              <label className="text-sm text-slate-200">
                Phone Number
                <input className={fieldBaseClass} type="tel" name="phone"/>
              </label>
              <label className="text-sm text-slate-200">
                LinkedIn Profile
                <input className={fieldBaseClass} type="url" name="linkedin" placeholder="https://linkedin.com/in/yourprofile" />
              </label>

              <label className="text-sm text-slate-200">
                GitHub Profile
                <input className={fieldBaseClass} type="url" name="github" placeholder="https://github.com/yourusername" />
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
                        <input className={fieldBaseClass} type="text" name={`company-${entry.id}`} placeholder="Innovate Tech" />
                      </label>
                      <label className="text-sm text-slate-200">
                        Role
                        <input className={fieldBaseClass} type="text" name={`role-${entry.id}`} placeholder="Lead UI/UX Designer" />
                      </label>
                      <label className="text-sm text-slate-200">
                        Start Date
                        <input className={fieldBaseClass} type="month" name={`startDate-${entry.id}`} />
                      </label>
                      <label className="text-sm text-slate-200">
                        End Date
                        <input className={fieldBaseClass} type="month" name={`endDate-${entry.id}`} />
                      </label>
                      <label className="text-sm text-slate-200 sm:col-span-2">
                        Description & Key Achievements
                        <textarea
                          className={fieldBaseClass}
                          name={`workSummary-${entry.id}`}
                          rows="3"
                          placeholder="Describe outcomes, ownership, and measurable impact..."
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
                        <input className={fieldBaseClass} type="text" name={`institution-${entry.id}`} placeholder="Design University of NY" />
                      </label>
                      <label className="text-sm text-slate-200">
                        Degree
                        <input className={fieldBaseClass} type="text" name={`degree-${entry.id}`} placeholder="BFA in Interaction Design" />
                      </label>
                      <label className="text-sm text-slate-200">
                        From
                        <input className={fieldBaseClass} type="text" name={`from-${entry.id}`} placeholder="YYYY" />
                      </label>
                      <label className="text-sm text-slate-200">
                        To (or Expected)
                        <input className={fieldBaseClass} type="text" name={`to-${entry.id}`} placeholder="YYYY" />
                      </label>
                      <label className="text-sm text-slate-200 w-[10%] sm:col-span-2">
                        CGPA
                        <input className={fieldBaseClass} type="text" name={`cgpa-${entry.id}`} />
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
                        />
                      </label>
                      <label className="text-sm text-slate-200">
                        Bullet Points
                        <textarea
                          className={fieldBaseClass}
                          name={`skillBullets-${entry.id}`}
                          rows="4"
                          placeholder="• React\n• Tailwind CSS\n• UI Architecture"
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
                        <input className={fieldBaseClass} type="text" name={`projectName-${entry.id}`} placeholder="Portfolio Redesign" />
                      </label>
                      <label className="text-sm text-slate-200">
                        Tech Stack
                        <input className={fieldBaseClass} type="text" name={`projectRole-${entry.id}`} />
                      </label>
                      <label className="text-sm text-slate-200 sm:col-span-2">
                        Link
                        <input className={fieldBaseClass} type="url" name={`projectUrl-${entry.id}`} placeholder="https://your-project.com" />
                      </label>
                      <label className="text-sm text-slate-200 sm:col-span-2">
                        Description
                        <textarea
                          className={fieldBaseClass}
                          name={`projectDescription-${entry.id}`}
                          rows="3"
                          placeholder="Describe your goal, stack, and measurable impact..."
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
