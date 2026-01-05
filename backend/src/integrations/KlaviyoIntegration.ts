import axios from 'axios';
import { config } from '../config';

export interface KlaviyoCampaignData {
  id: string;
  name: string;
  status: string;
  sent_at: Date | null;
  open_rate: number;
  click_rate: number;
  conversion_rate: number;
}

export class KlaviyoIntegration {
  public readonly platform = 'klaviyo';
  private readonly apiUrl: string;
  private readonly apiKey: string;

  constructor() {
    this.apiUrl = config.platforms.klaviyo.apiUrl;
    this.apiKey = config.platforms.klaviyo.apiKey;
  }

  private get headers() {
    return {
      'Authorization': `Klaviyo-API-Key ${this.apiKey}`,
      'Content-Type': 'application/json',
      'revision': '2024-02-15',
    };
  }

  async fetchCampaigns(): Promise<KlaviyoCampaignData[]> {
    try {
      const response = await axios.get(`${this.apiUrl}/campaigns`, {
        headers: this.headers,
      });

      return response.data.data.map((campaign: any) => {
        const stats = campaign.attributes.stats || {};
        const recipients = stats.recipients || 1;

        return {
          id: `klaviyo_${campaign.id}`,
          name: campaign.attributes.name,
          status: campaign.attributes.status,
          sent_at: campaign.attributes.send_time ? new Date(campaign.attributes.send_time) : null,
          open_rate: stats.opens ? (stats.opens / recipients) * 100 : 0,
          click_rate: stats.clicks ? (stats.clicks / recipients) * 100 : 0,
          conversion_rate: stats.conversions ? (stats.conversions / recipients) * 100 : 0,
        };
      });
    } catch (error) {
      console.error('Error fetching Klaviyo campaigns:', error);
      return [];
    }
  }

  async fetchMetrics(): Promise<any[]> {
    try {
      const response = await axios.get(`${this.apiUrl}/metrics`, {
        headers: this.headers,
      });

      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching Klaviyo metrics:', error);
      return [];
    }
  }

  async fetchProfiles(email?: string): Promise<any[]> {
    try {
      const params = email ? { filter: `equals(email,"${email}")` } : {};
      const response = await axios.get(`${this.apiUrl}/profiles`, {
        headers: this.headers,
        params,
      });

      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching Klaviyo profiles:', error);
      return [];
    }
  }
}
