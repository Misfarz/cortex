import React from 'react'

function GetStarted() {
  return (
       <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 text-white font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 flex items-center gap-2 group">
            Get Started
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
  )
}

export default GetStarted