interface ActionLogProps {
  logs: string[];
  onClear: () => void;
}

export function ActionLog({ logs, onClear }: ActionLogProps) {
  return (
    <div className="bg-gray-900 rounded-xl shadow-2xl p-6">
      <h3 className="text-xl font-bold text-white mb-4">📋 Registro de Acciones</h3>
      <div className="bg-black rounded-lg p-4 h-64 overflow-y-auto font-mono text-sm">
        {logs.length === 0 ? (
          <p className="text-gray-500">No hay acciones registradas aún...</p>
        ) : (
          logs.map((log, index) => (
            <div key={index} className="text-green-400 mb-2">
              [{new Date().toLocaleTimeString()}] {log}
            </div>
          ))
        )}
      </div>
      <button
        onClick={onClear}
        className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
      >
        Limpiar Log
      </button>
    </div>
  );
}