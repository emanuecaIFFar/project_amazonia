
import React, { useState, useCallback } from 'react';
import { askGemini } from '../services/geminiService';

const GeminiChat: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setResponse('');

    try {
      const geminiResponse = await askGemini(prompt);
      setResponse(geminiResponse);
    } catch (err) {
      setError('Desculpe, não foi possível obter uma resposta. Tente novamente.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [prompt, isLoading]);

  return (
    <section id="chat" className="py-20 lg:py-32 bg-[#0f1d13]">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">Explore a Amazônia com IA</h2>
          <p className="text-lg text-white/80">
            Tem alguma dúvida sobre a fauna, flora, ou os desafios da Amazônia? Pergunte à nossa IA especializada.
          </p>
        </div>

        <div className="bg-white/5 p-8 rounded-lg border border-white/10 backdrop-blur-sm">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ex: Qual o maior animal da Amazônia?"
                className="flex-grow bg-white/10 text-white placeholder-white/50 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#96d117] transition-all"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="bg-[#96d117] text-gray-900 font-bold px-8 py-3 rounded-md hover:bg-[#a9e83b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-t-transparent border-gray-900 rounded-full animate-spin"></div>
                ) : (
                  'Perguntar'
                )}
              </button>
            </div>
          </form>

          {(isLoading || response || error) && (
            <div className="mt-8 p-6 bg-black/20 rounded-md min-h-[100px]">
              {isLoading && <p className="text-white/70 animate-pulse">Pensando...</p>}
              {error && <p className="text-red-400">{error}</p>}
              {response && <p className="text-white/90 whitespace-pre-wrap leading-relaxed">{response}</p>}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default GeminiChat;
